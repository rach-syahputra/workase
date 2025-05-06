import bcrypt from 'bcrypt';

import { ResponseError } from '../helpers/error';
import { generateDeveloperAccessToken } from '../helpers/jwt';
import DeveloperRepository from '../repositories/developers/developer.repository';
import { LoginDeveloperRequest } from '../interfaces/developer.interface';

class DeveloperService {
  private developerRepository: DeveloperRepository;

  constructor() {
    this.developerRepository = new DeveloperRepository();
  }

  login = async (req: LoginDeveloperRequest) => {
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
