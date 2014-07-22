/**
 * create a function that compares spec objects to test objects
 * @param specObj
 * @returns {testSpec} function
 */
module.exports = function parseSpec( specObj ) {
    var parsedSpec = {fn: [], obj: []};
    if ( specObj && typeof specObj === 'object' ) {
        Object.keys( specObj ).reduce( function ( parsed, key ) {
            parsed[(typeof specObj[key] === 'function' ? 'fn' : 'obj')].push( key );
            return parsed;
        }, parsedSpec );
    }
    return function testSpec( testObj ) {
        var testState = {};
        return specObj === testObj ||
            !!testObj &&
            typeof testObj === 'object' &&
            parsedSpec.obj.every( function ( key ) {
                return specObj[key] === testObj[key];
            } ) &&
            parsedSpec.fn.every( function ( key ) {
                return (key in testObj) && specObj[key]( testObj[key], key, testObj, testState );
            } );
    };
};