const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: 'No credentials sent!' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Basic') {
        return res.status(401).json({ error: 'Invalid authorization format' });
    }

    const base64Credentials = parts[1];

    if (!base64Credentials) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    let credentials;
    try {
        credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    } catch (err) {
        return res.status(401).json({ error: 'Invalid base64 encoding' });
    }

    const [username, password] = credentials.split(':');

    if (username === 'admin' && password === 'adminpass') {
        next();
    } else {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
};

module.exports = authMiddleware;



