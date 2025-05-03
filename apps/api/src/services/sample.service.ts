import bcrypt from 'bcrypt';

import {
  AddSampleRequestService,
  GetSampleByEmailRequest,
  LoginSampleRequest,
} from '../interfaces/sample/sample.interface';
import { ResponseError } from '../helpers/error';
import SampleRepository from '../repositories/sample/sample.repository';
import { validate } from '../helpers/validation';
import {
  addSampleSchema,
  getSampleByEmailSchema,
} from '../validations/sample/sample.validation';
import { generateHashedPassword } from '../helpers/utils';
import ImageRepository from '../repositories/cloudinary/image.repository';
import { CLOUDINARY_DEVELOPER_IMAGE_FOLDER } from '../config';
// import { putAccessToken } from '../helpers/jwt';

class SampleService {
  private sampleRepository: SampleRepository;
  private imageRepository: ImageRepository;

  constructor() {
    this.sampleRepository = new SampleRepository();
    this.imageRepository = new ImageRepository();
  }

  getSample = async () => {
    return await this.sampleRepository.getSample();
  };

  getSampleByEmail = async ({ email }: GetSampleByEmailRequest) => {
    validate(getSampleByEmailSchema, { email });

    const sample = await this.sampleRepository.getSampleByEmail({ email });
    if (!sample) throw new ResponseError(404, 'Sample not found');

    return {
      id: sample.id,
      email: sample.email,
      name: sample.email,
    };
  };

  addSample = async (req: AddSampleRequestService) => {
    validate(addSampleSchema, {
      email: req.email,
      name: req.name,
      password: req.password,
    });

    await this.checkSampleExistence(req.email);
    req.password = await generateHashedPassword(req.password);

    // cloudinary flow
    let developerImage;

    if (req.image) {
      developerImage = await this.imageRepository.upload(
        req.image.path,
        CLOUDINARY_DEVELOPER_IMAGE_FOLDER,
      );
    }
    //

    const sample = await this.sampleRepository.addSample({
      email: req.email,
      name: req.name,
      password: req.password,
      image: developerImage?.secure_url,
    });

    return sample;
  };

  checkSampleExistence = async (email: string) => {
    const sample = await this.sampleRepository.getSampleByEmail({ email });
    if (sample)
      throw new ResponseError(409, 'Email already exists, try another one');
  };

  login = async (req: LoginSampleRequest) => {
    const user = await this.sampleRepository.getUserByEmail(req.email);

    const isCorrectPassword = await bcrypt.compare(
      req.password,
      user?.password || '',
    );

    if (!isCorrectPassword) throw new ResponseError(400, 'Invalid credentials');

    // const accessToken = await putAccessToken({
    //   id: user?.id!,
    //   email: user?.email!,
    //   jobId: user?.jobId!,
    //   role: 'USER',
    // });

    // return {
    //   accessToken,
    // };
  };
}

export default SampleService;
