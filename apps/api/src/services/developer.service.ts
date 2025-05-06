import bcrypt from 'bcrypt';

import DeveloperRepository from '../repositories/developers/developer.repository';
import { LoginDeveloperRequest } from '../interfaces/developer.interface';
import { loginDeveloperSchema } from '../validations/developer.validation';
import { validate } from '../helpers/validation';
import { generateDeveloperAccessToken } from '../helpers/jwt';
import { ResponseError } from '../helpers/error';

class DeveloperService {
  private developerRepository: DeveloperRepository;

  constructor() {
    this.developerRepository = new DeveloperRepository();
  }

  login = async (req: LoginDeveloperRequest) => {
    validate(loginDeveloperSchema, req);

    const developer = await this.developerRepository.getDeveloperByEmail({
      email: req.email,
    });

    const isCorrectPassword = await bcrypt.compare(
      req.password,
      developer?.password || '',
    );

    if (!isCorrectPassword) throw new ResponseError(400, 'Invalid credentials');

    const accessToken = await generateDeveloperAccessToken({
      id: developer?.id!,
      email: developer?.email!,
      role: 'DEVELOPER',
      name: developer?.name!,
      slug: developer?.slug!,
    });

    return {
      accessToken,
    };
  };
}

export default DeveloperService;
