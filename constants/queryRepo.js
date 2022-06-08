//your app queries come here
module.exports = {
    SQL : {
       INSERT: { },
       UPDATE: { },
       SELECT: { 
           enum: `SELECT evm.mapping_key, evm.mapping_name, eoe.type_key, v.name as vendor_name
           FROM enum_vendor_mapping as evm
           JOIN enum_values as ev ON ev.id = evm.enum_value_id
           JOIN enum_of_enums as eoe ON eoe.id = ev.enum_id
           JOIN vendor as v ON v.id = evm.vendor_id
           WHERE `
       }
    },
    mongo : {
      
    }
};