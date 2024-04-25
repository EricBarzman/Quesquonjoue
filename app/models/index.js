const Instrument = require('./Instrument');
const SetList = require('./SetList');
const Tune = require('./Tune');
const User = require('./User');
const Style = require('./Style');
const Band = require('./Band');
const Costume = require('./Costume');

const sequelize = require('./sequelize-client');

/* USER */
User.belongsToMany(SetList, {
    through: 'user_creates_setlist',
    foreignKey: 'user_id',
    as: 'creator_user'
});
User.hasOne(SetList, {
    as: 'leader_for_setlist',
    foreignKey: 'user_gig_leader_id'
});
User.belongsToMany(Instrument, {
    through: 'user_has_instrument',
    foreignKey: 'user_id',
});

const User_is_in_a_band = sequelize.define(
    'user_is_in_a_band',
    {},
    { freezeTableName: true },
    { timestamps: false }
);
User.belongsToMany(Band, {
    through: 'User_is_in_a_band',
    foreignKey: 'user_id',
    otherKey: 'band_id'
});


/* BAND */
Band.belongsToMany(User, {
    through: 'User_is_in_a_band',
    foreignKey: 'band_id',
    otherKey: 'user_id'
});


/* COSTUME */
Costume.hasMany(SetList, { foreignKey: "costume_id" });


/* STYLE */
Style.hasMany(Tune, { foreignKey: "style_id" });


/* INSTRUMENT */
Instrument.belongsToMany(User, {
    through: 'user_has_instrument',
    foreignKey: "instrument_id"
});
Instrument.belongsToMany(Tune, {
    through: 'tune_does_not_have_instrument',
    foreignKey: "instrument_id"
});


/* SETLIST */
SetList.belongsToMany(User, {
    through: 'user_creates_setlist',
    foreignKey: 'setlist_id'
});
SetList.belongsTo(User, {
    as : 'gig_leader',
    foreignKey: 'user_gig_leader_id'
});
SetList.belongsTo(Costume, {
    as : "costume",
    foreignKey: 'costume_id'
});
SetList.belongsToMany(Tune, {
    through: 'Setlist_list_of_tunes',
    foreignKey: "setlist_id",
    as: "tunes"});


/* TUNE */
Tune.belongsToMany(SetList, {
    through: 'Setlist_list_of_tunes',
    foreignKey: "setlist_id",
    as: "setlist"
});
Tune.belongsToMany(Instrument, {
    through: 'tune_does_not_have_instrument',
    foreignKey: "tune_id"
});
Tune.belongsTo(Style, {
    foreignKey: "style_id"
});

module.exports = { User, User_is_in_a_band, Band, Costume, Tune, SetList, Instrument, Style };