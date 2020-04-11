const Client = require('../models/Client');

exports.store = async function (req, res) {
  try {
    const client = new Client(req.body);
    await client.save();
    const token = await client.generateAuthToken();
    res.status(201).send({ client, token });
  } catch (error) {
      res.status(400).send(error)
  }
};

exports.login = async function(req, res) {
  //Login a registered client
  try {
    const { email, password } = req.body;
    const client = await Client.findByCredentials(email, password);
    if (!client) {
        return res.status(401).send({error: 'Login failed! Check authentication credentials'});
    }
    const token = await client.generateAuthToken();
    res.send({ client, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMe = async function(req, res) {
  res.send(req.client);
};

exports.updateMe = async function (req, res) {
  try {
    const client = await Client.findByIdAndUpdate(req.client._id, {
      $set: req.body
    });

    res.status(201).send(client);
  } catch (error) {
      res.status(400).send(error)
  }
};

exports.logout = async (req, res) => {
  // Log user out of the application
  try {
    req.client.tokens = req.client.tokens.filter((token) => {
      return token.token != req.token
    });
    await req.client.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.logoutAll = async(req, res) => {
  // Log user out of all devices
  try {
    req.client.tokens.splice(0, req.client.tokens.length);
    await req.client.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// exports.delete = async function (req, res) {
//   try {
//     await Product.findByIdAndRemove(req.params.id);
//     res.status(200).send({
//         message: 'Produto removido com sucesso!'
//     });
//   } catch (e) {
//       res.status(500).send({
//           message: 'Falha ao remover o produto.'
//       });
//   }
// };

// exports.update = async function (req, res) {
//   try {
//     await Product.findByIdAndUpdate(req.params.id, {
//       $set: req.body
//     });
//     res.status(200).send({
//         message: 'Produto atualizado com sucesso!'
//     });
//   } catch (e) {
//       res.status(500).send({
//           message: 'Falha ao atualizar.'
//       });
//   }
// };
