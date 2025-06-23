import { User } from "../models/user.model";
import { NotFoundError } from "../errors/not-found.error";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";

export class UserService {
    private userRepository: UserRepository;
    private authService: AuthService;

    constructor(){
        this.userRepository = new UserRepository();
        this.authService = new AuthService();
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
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;
        await this.userRepository.update(user);
    };

    async update(id: string, user: User){
        const userUp = await this.userRepository.getById(id);
        if(!userUp){
            throw new NotFoundError("Usuário não encontrado");
        };

        userUp.nome = user.nome;
        userUp.email = user.email;
        await this.authService.update(id, user);
        await this.userRepository.update(userUp);
    }

    async delete(id: string){
        await this.authService.delete(id);
        return this.userRepository.delete(id);
    }
}