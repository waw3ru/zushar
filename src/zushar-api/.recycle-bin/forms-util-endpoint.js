/*
* created by waweru
* utility endpoints for form management
* */

/***************************************************************************/
/*
* START OF RESPONDANTS ROUTING
* */

// respondants utility endpoints
const respondantsRouter = express.Router();
/*
* @path: '/:form_id/:user_id'
* @method: POST,
* @route: adds respondants to the list of respondants
* */
respondantsRouter.post('/:form_id/:user_id/',
    function (req, res, next) {

        if (req.params.user_id !== req.zushar_auth.id) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsUtil
                .addRespondant({
                    id: req.params.form_id,
                    author: req.params.user_id,
                    respondant: req.body.respondant
                },
                function (error, results) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(results);
                    } 
            });
        }
    });

/*
* @path: '/:form_id/:user_id/:user_type'
* @method: GET,
* @route: get the list of respondants
* */
respondantsRouter.get('/:form_id/:user_id/:user_type',
    function (req, res, next) {
        let formUser = {
            account_id: req.params.user_id,
            account: req.params.user_type
        };

        if ( req.params.user_type === 'author' && (req.params.user_id !== req.zushar_auth.id) ) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsUtil
                .getRespondants({
                    id: req.params.form_id,
                    account_id: req.params.user_id,
                    account: req.params.user_type
                },
                function (error, results) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(results);
                    } 
                });
        }
    });

/*
* @path: '/:form_id/:user_id/:user_type'
* @method: GET,
* @route: get the list of respondants
* */
respondantsRouter.delete('/:form_id/:user_id/',
    function (req, res, next) {
        let formUser = {
            account_id: req.params.user_id,
            account: req.params.user_type
        };

        if (req.params.user_id !== req.zushar_auth.id) {
            let date = new Date();
            let error = `[${date.toDateString()}] could not access form. check your permissions`;
            res.status(500);
            res.json({error});
        }
        else {
            formsUtil
                .removeRespondant({
                    id: req.params.form_id,
                    author: req.params.user_id,
                    respondant: req.body.respondant
                },
                function (error, results) {
                    if (!_.isNil(error)) {
                        res.status(500);
                        res.json({error});
                    }
                    else {
                        res.json(results);
                    } 
                });
        }

    });
// expose the respondants utility endpoint to the forms routing system
Router.use('/respondants', auth.jwtMiddleware, auth.loggedInUser, respondantsRouter);

/*
* END OF RESPONDANTS ROUTING
* */
/***************************************************************************/