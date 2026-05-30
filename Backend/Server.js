const express = require('express');
require('dotenv').config();
const jwt = require('jsonwebtoken');
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

            const options = {
                filter: `(sAMAccountName=${username})`,
                scope: 'sub',
                attributes: ['memberOf', 'cn']
            };
            
            console.log("options:", options);
            
            let roles = []

            client.search("dc=sykkelfix, dc=as", options, (err, searchRes) => {
                searchRes.on('searchEntry', (entry) => {
                    console.log("entry: ", entry)

                    const attributes = entry.attributes.find(x => x.type === "memberOf");
                    const userGroups = attributes.values || [];
                    // const userGroups = entry.object.ou || [];

                    roles = userGroups.map(group => {
                        const match = group.match(/^CN=([^,]+)/);
                        return match ? match[1] : null;
                    }).filter(Boolean);

                    console.log("Roles:", roles);
                });

                searchRes.on('end', () => {
                    console.log();
                    console.log("LDAP SUCCESS");
                    client.unbind();
                    resolve({roles: roles, success: true})
                });
            });
            // resolve({roles: roles, success: true})
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

        if (!auth.success) {
            return res.json({ success: false });
        }

            const userForToken = {
                username: username,
            }

            const token = jwt.sign(userForToken, process.env.SECRET)

        return res.json({
            success: true,
            roles: auth.roles,
            token: token
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
