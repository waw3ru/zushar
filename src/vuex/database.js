/**
 * Created by w3shy on 12/6/16.
 *
 * @desc:
 *  This is a forerunner-db api for Zushar for js browser database to enable persistence in the tool
 */

import forerunner from 'forerunnerdb/js/dist/fdb-all.js'

let fdb = new ForerunnerDB();
/*
* @desc:
*   expose the db instance for further manipulation or custom queries through out the tool
* */
let db = fdb.db('zushar');
export let Forms = db.collection('forms').deferredCalls(false);
export let Questions = db.collection('questions', { primaryKey: 'id' }).defferedCalls(false);