import { operatorRepository } from "../repositories/operator.repository";
import { resourceAvailabilityService } from "./resource-availability.service";
import { ApiError, ConflictError, NotFoundError } from "../utils/ApiError";
import { Messages, Entity } from "../constants/messages";
import type { Operator } from "@db/schema";

export class OperatorService {
  /** Each operator carries their live availability, derived from the lines holding them. */
  async getOperators(filters?: { designation?: string; includeInactive?: boolean }) {
    const operators = await operatorRepository.findAll(filters);
    const decorated = await resourceAvailabilityService.decorate([], operators);
    return decorated.operators;
  }

  async getOperator(id: number | string): Promise<Operator> {
    const operator = await operatorRepository.findById(id);
    if (!operator) throw new NotFoundError(Messages.notFound(Entity.OPERATOR));
    return operator;
  }

  async createOperator(data: { name: string; employeeCode?: string; designation: string; shift?: string; status: string }): Promise<Operator> {
    const existing = await operatorRepository.findAll({ includeInactive: true });
    if (existing.some((o) => o.name === data.name)) {
      throw new ConflictError(Messages.alreadyExists(Entity.OPERATOR));
    }
    return operatorRepository.create(data);
  }

  async updateOperator(id: number | string, data: { name?: string; employeeCode?: string; designation?: string; shift?: string; status?: string; isActive?: boolean }): Promise<Operator> {
    const operator = await operatorRepository.findById(id);
    if (!operator) throw new NotFoundError(Messages.notFound(Entity.OPERATOR));
    const updated = await operatorRepository.update(id, data);
    if (!updated) throw new NotFoundError(Messages.notFound(Entity.OPERATOR));
    return updated;
  }

  async deleteOperator(id: number | string): Promise<void> {
    const operator = await operatorRepository.findById(id);
    if (!operator) throw new NotFoundError(Messages.notFound(Entity.OPERATOR));
    await operatorRepository.softDelete(id);
  }
}

export const operatorService = new OperatorService();
