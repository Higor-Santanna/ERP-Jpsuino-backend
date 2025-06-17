import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";
import { UserRepository } from "../repositories/user.repository";

export class UserService {
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository();
    }

    async getAll(){
        return this.userRepository.getAll();
    };

    async getById(id: string){
        const user = await this.userRepository.getById(id);
        if(!user){
            throw new NotFoundError("Usuário não encontrado")
        }
        return user;
    };

    async save(user: User){
        return this.userRepository.save(user);
    };

    async update(id: string, user: User){
        const userUp = await this.userRepository.getById(id);
        if(!userUp){
            throw new NotFoundError("Usuário não encontrado");
        };

        userUp.nome = user.nome;
        userUp.email = user.email;
        this.userRepository.update(userUp);
    }

    async delete(id: string){
        return this.userRepository.delete(id);
    }
}