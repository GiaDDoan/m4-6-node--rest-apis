const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

// write your handlers here...
const handleClients = (req, res) => {
    res.status(200).json({ status: 200, data: clients });
};

const handleClientsId = (req, res) => {
    const clientId = req.params.id;
    if(clients.some((client) => client.id == clientId)){
        let clientInfo = clients.filter((client) => client.id == clientId);
        res.status(200).json({ status: 200, data: clientInfo });
    } else {
        res.status(404).json({ status: 404, error: 'id not found'});
    }
    
};

const handleNewClient = (req, res) => {
    const newClient = req.body;
    const sameEmail = clients.some((client) => {
        return client.email == newClient.email;
    });

    if(sameEmail){
        res.status(409).send({ status: 409, error: 'Conflict'})
    }
    if (!sameEmail) {
        clients.push(newClient);
        res.status(200).send({ status: 200, data: clients})
    }
};

const handleDeleteClient = (req, res) => {
    const clientId = req.params.id;
    if(clients.some((client) => client.id == clientId)) {
        const newArr = clients.filter((client) => client.id !== clientId);
        res.status(200).send({ status:200, data: newArr });
    } else {
        res.status(409).send({ status:409, error: 'Conflict' });
    }
    


}

module.exports = { handleClients, handleClientsId, handleNewClient, handleDeleteClient };
