import { DataSource, Repository } from 'typeorm'
import { UserRepository } from '../../../core/ports/UserRepository'
import { User } from '../schema/User'
import { UserEntity } from '../../../core/entities/UserEntity'
import { UserMapper } from '../Mappers/UserMapper'

export class UserRepositoryImpl implements UserRepository {
  private db: DataSource
  private userRepo: Repository<User>

  constructor(db: DataSource) {
    this.db = db
    this.userRepo = this.db.getRepository(User)
  }

  async getUserByRut(rut: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: {
        rut: rut
      }
    })

    return user ? UserMapper.toDomain(user) : null
  }

  async getAllUsers(): Promise<UserEntity[] | []> {
    const users = await this.userRepo.find({
      relations: {
        role: true,
        evaluations: true,
      },
    })

    return users.map(user => UserMapper.toDomain(user))
  }

  async register(userData: Partial<UserEntity>): Promise<UserEntity | null> {
    const ormUserData = UserMapper.toSchema(userData as UserEntity)
    const newUser = this.userRepo.create(ormUserData)
    const savedUser = await this.userRepo.save(newUser)

    return savedUser ? UserMapper.toDomain(savedUser) : null
  }

  async login(rut: string, password: string): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({
      where: { rut: rut, password: password },
      relations: {
        role: true,
        evaluations: true,
      },
    })

    return user ? UserMapper.toDomain(user) : null
  }
}
