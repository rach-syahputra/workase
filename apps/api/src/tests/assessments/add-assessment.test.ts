import request from 'supertest';
import App from '@/app';

import { getDeveloperAuthToken } from '../helpers/auth.helper';
import {
  addSkill,
  deleteAssessment,
  deleteSkill,
  getAssessmentById,
  getSkillById,
} from '../helpers/assessment.helper';

const app = new App().getServer();

describe('POST /api/assessments', () => {
  let token: string;

  beforeAll(async () => {
    token = await getDeveloperAuthToken({
      email: 'nadiyariska@gmail.com',
      password: '77772345',
    });
  });

  it('should create an assessment', async () => {
    // Create a skill before adding an assessment
    const skill = await addSkill();
    const requestBody = {
      skillId: skill.id,
    };

    // Create an assessment
    const response = await request(app)
      .post('/api/assessments')
      .set('Authorization', token)
      .send(requestBody)
      .expect(201);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
        message: expect.any(String),
        data: expect.objectContaining({
          assessment: expect.any(Object),
        }),
      }),
    );

    // Delete the assessment and ensure it has been deleted
    const assessmentId = response.body.data.assessment.id;
    await deleteAssessment(assessmentId);
    expect(await getAssessmentById(assessmentId)).toBeFalsy();

    // Delete the skill and ensure it has been deleted
    const skillId = skill.id;
    await deleteSkill(skillId);
    expect(await getSkillById(skillId)).toBeFalsy();
  });
});
