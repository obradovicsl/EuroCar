const Vehicle = require('../model/vehicleModel');
const Object = require('../model/objectModel');
const Location = require('../model/locationModel');

exports.initializeRentals = async function(rental) {
    const newRental = {...rental};
    const vehicles = new Array();
    for(const vehicleId of newRental.rentedVehiclesIds)
    {
        const vehicle = await Vehicle.findById(vehicleId);
        vehicle &&  vehicles.push(`${vehicle.brand} ${vehicle.model}`);
    }
    delete newRental.rentedVehiclesIds;
    newRental.vehicles = vehicles;


    const object = await Object.findById(newRental.rentalCompanyId);
    newRental.object = object?.name;
    delete newRental.rentalCompanyId;

    return newRental;
};

exports.initializeObject = async function(object) {

    try{

        const newObject = {...object};
        
        const vehicles = new Array();
        
        const location = await Location.findById(newObject.locationId);
        newObject.address = location?.address;
        delete newObject.locationId;
        for(const vehicleId of newObject.vehiclesIds)
        {
            const vehicle = await Vehicle.findById(vehicleId);
            vehicle &&  vehicles.push(vehicle);
        }
        delete newObject.vehiclesIds;
        newObject.vehicles = vehicles;
            
         return newObject;
        }catch(err)
        {
            console.log(err);
        }   
};