import User from '../models/User';

class UserController {
  async index(req, res) {
    const response = await User.find();

    return res.status(200).json({
      message: 'Todos os usuários localizados.',
      response,
    });
  }

  async store(req, res) {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).json({
        message: 'Usuário já cadastrado!',
      });
    }
    const { id, name, email } = await User.create(req.body);

    return res.status(200).json({
      id,
      name,
      email,
    });
  }

  async show(req, res) {
    const { userId } = req.params;

    try {
      const response = await User.findById(userId);

      if (!response) {
        return res.status(400).json({
          message: 'O id informado não foi localizado.',
        });
      }
      const { name, email, active } = response;

      return res.status(200).json({
        message: 'Usuário localizado',
        name,
        email,
        active,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'O número de id informado é inválido.',
      });
    }
  }

  async update(req, res) {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (req.email !== user.email) {
      const userExists = await User.findOne({ email: req.body.email });

      if (userExists) {
        return res.status(400).json({
          message: 'Usuário já cadastrado!',
        });
      }
    }

    if (req.oldPassword && !(await user.validatePassword(req.oldPassword))) {
      return res.status(401).json({
        message: 'Senha incorreta!',
      });
    }

    await User.findByIdAndUpdate(
      { _id: userId },
      {
        ...req.body,
      }
    );
    return res.send();
  }

  async destroy(req, res) {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { active: false }
    );
    if (user) {
      return res.status(200).json({ message: 'Conta desativada com sucesso' });
    }
    return res.status(400).json({ message: 'Conta não encontrada' });
  }
}

export default new UserController();
