import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { Admin } from './admin';

@Injectable()
export class AuthService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async findByLogin(login: string): Promise<Admin> {
    return this.adminRepository.findByLogin(login);
  }

  async findById(id: number): Promise<Admin> {
    return this.adminRepository.findById(id);
  }
}
