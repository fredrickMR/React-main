const express = require('express');
const ldap = require('ldapjs')
const app = express();
app.use(express.json());

function authenticateAD(username, password)
{
    return new Promise((resolve) =>
    {
        const client = ldap.createClient({
            url: "ldaps://dc.sykkelfix.as:636",
            tlsOptions: {rejectUnauthorized: false}
        });

        const userPrincipal = `${username}@sykkelfix.as`;

        client.bind(userPrincipal, password, (err) => {
            if(err) {
                console.log("AD login error:", err.message);
                client.unbind();
                return resolve(false)
            }

            console.log("LDAP SUCCESS");

            client.unbind();
            resolve(true);
        });

        client.on('error', (err) =>
        {
            console.log('LDAP CONNECTION ERROR', err.message);
            resolve(false);
        })
    });

}

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.post('/api/login', async (req, res) => {

    try {

        const { username, password } = req.body;

        const auth = await authenticateAD(username, password);

        if (!auth) {
            return res.json({ success: false });
        }

        return res.json({
            success: true,
            username
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

app.listen(3000, "127.0.0.1", () => {
    console.log("Backend running")
});
