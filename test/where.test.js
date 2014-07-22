var test = require( 'tape' );
var where = require( '../' );

test( 'where has the right interface', function ( t ) {
    t.plan( 1 );

    t.equal( typeof where, 'function', 'where is a function' );
} );

test( 'where returns a function', function ( t ) {
    t.plan( 1 );

    t.equal( typeof where(), 'function', 'where returns a function' );
} );

test( 'where always matches the spec', function ( t ) {
    t.plan( 10 );

    var spec = {};

    t.equal( where( spec )( spec ), true, 'spec always matches' );
    t.equal( where()(), true, 'undefined spec always matches undefined' );
    t.equal( where( null )( null ), true, 'null spec always matches null' );
    t.equal( where( 1 )( 1 ), true, 'number spec always matches number' );
    t.equal( where( 0 )( 0 ), true, '0 spec always matches 0' );
    t.equal( where( Infinity )( Infinity ), true, 'Infinity spec always matches Infinity' );
    t.equal( where( '' )( '' ), true, 'empty string spec always matches empty string' );
    t.equal( where( 'test' )( 'test' ), true, 'string spec always matches the same string' );
    t.equal( where( true )( true ), true, 'true spec always matches true' );
    t.equal( where( false )( false ), true, 'false spec always matches false' );
} );

test( 'where fails to match a non-object or null with no spec', function ( t ) {
    t.plan( 9 );

    t.equal( where()( null ), false, 'spec fails to match null' );
    t.equal( where()( 0 ), false, 'spec fails to match zero' );
    t.equal( where()( 1 ), false, 'spec fails to match numbers' );
    t.equal( where()( NaN ), false, 'spec fails to match NaN' );
    t.equal( where()( Infinity ), false, 'spec fails to match Infinity' );
    t.equal( where()( '' ), false, 'spec fails to match empty strings' );
    t.equal( where()( 'test' ), false, 'spec fails to match strings' );
    t.equal( where()( true ), false, 'spec fails to match true' );
    t.equal( where()( false ), false, 'spec fails to match false' );
} );

test( 'where fails to match a non-object or null with a different spec', function ( t ) {
    t.plan( 9 );

    t.equal( where( {} )( null ), false, 'spec fails to match null' );
    t.equal( where( {} )( 0 ), false, 'spec fails to match zero' );
    t.equal( where( {} )( 1 ), false, 'spec fails to match numbers' );
    t.equal( where( {} )( NaN ), false, 'spec fails to match NaN' );
    t.equal( where( {} )( Infinity ), false, 'spec fails to match Infinity' );
    t.equal( where( {} )( '' ), false, 'spec fails to match empty strings' );
    t.equal( where( {} )( 'test' ), false, 'spec fails to match strings' );
    t.equal( where( {} )( true ), false, 'spec fails to match true' );
    t.equal( where( {} )( false ), false, 'spec fails to match false' );
} );

test( 'where function values receive the correct arguments', function ( t ) {
    t.plan( 4 );

    var val, key, obj, state;

    var spec = {x: function ( a,b,c,d ) {
        val = a;
        key = b;
        obj = c;
        state = d;
        state.count = state.count || 0;
        state.count += 1;
    } };

    var testObj = {x: 1};

    where( spec )( testObj );

    t.equal( val, 1, 'val is the first argument' );
    t.equal( key, 'x', 'key is the second argument' );
    t.equal( obj, testObj, 'obj is the third argument' );
    t.equal( state.count, 1, 'state is the last argument' );
} );

test( 'where can match using function value(s)', function ( t ) {
    t.plan( 2 );

    t.equal( where( {x: function ( val, key, obj ) {
        return  val + obj.y > 10;
    }} )( {x: 2, y: 7} ), false, 'where can take function constraints (false)' );

    t.equal( where( {x: function ( val, key, obj/*, state*/ ) {
        return  val + obj.y > 10;
    }} )( {x: 3, y: 8} ), true, 'where can take function constraints (true)' );
} );

test( 'where can match using non-function value(s)', function ( t ) {
    t.plan( 2 );

    t.deepEqual( [
        {x: 2, y: 1},
        {x: 10, y: 2},
        {x: 8, y: 3},
        {x: 10, y: 4}
    ].filter( where( {x: 10} ) ), [
        {x: 10, y: 2},
        {x: 10, y: 4}
    ], 'where can take single property constraints' );

    t.deepEqual( [
        {x: 2, y: 1},
        {x: 10, y: 2},
        {x: 8, y: 3},
        {x: 10, y: 4}
    ].filter( where( {x: 10, y: 2} ) ), [
        {x: 10, y: 2}
    ], 'where can take multiple property constraints' );
} );