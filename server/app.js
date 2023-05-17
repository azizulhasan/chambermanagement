const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const { varifyIsFromCode, verifyToken, verifyAccess } = require('./auth/varify');

/**
 * Routes
 */
const contactRoutes = require('./routes/contactRoutes');
const contactFormRoutes = require('./routes/contactFormRoutes');
const usersRoutes = require('./routes/usersRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const branchesRoutes = require('./routes/branchesRoutes');
const schedulesRoutes = require('./routes/schedulesRoutes');
const userSchedulesRoutes = require('./routes/userSchedulesRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// express app
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
// connect to mongodb & listen for requests.
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 9892;
mongoose
    .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err));


// middleware & static files folder declare
// app.use(express.static('public'));
/**
 * This middleware is used for recognizing request object as string or array.
 * and "express.json()" function recognize request object as json format.
 */
app.use(express.urlencoded({ extended: true }));
/**
 * This middleware is used to console errors more elegent way.
 */
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


/**
 * Check if the request is from code not from others places live browser, postman etc
 */
app.use(varifyIsFromCode);


/**
 * Experience Routes
 */
app.use('/api/contact', contactRoutes);
/**
 * Contact form Routes
 */
app.use('/api/contact_form', contactFormRoutes);
/**
 * users Routes
 */
app.use('/api/users', usersRoutes);

/**
 * Settings routes
 */
app.use('/api/settings', settingsRoutes);

/**
 * Services routes
 */
app.use('/api/services', servicesRoutes);

/**
 * Services routes
 */
app.use('/api/branches', branchesRoutes);


/**
 * schedules routes
 */
app.use('/api/schedules', schedulesRoutes);

/**
 * User Schedule routes
 */
app.use('/api/userSchedules', userSchedulesRoutes);

/**
 * Payment Routes
 */
app.use('/api/payment', paymentRoutes);

/**
 * image file url
 */
app.use('/server/uploads', express.static(__dirname + '/uploads'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
    );
}
