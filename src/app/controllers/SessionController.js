import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({
        message: 'Usuário não localizado!',
      });
    }

    if (!user.active) {
      return res
        .status(401)
        .json({ message: 'Acesso bloqueado! O seu perfil foi desativado.' });
    }

    if (!(await user.validatePassword(password))) {
      return res.status(401).json({
        message: 'Senha incorreta!',
      });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
