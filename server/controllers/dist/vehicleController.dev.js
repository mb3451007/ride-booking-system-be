"use strict";

var Vehicle = require("../models/Vehicle");

var mongoose = require('mongoose');

exports.registerVehicle = function _callee(req, res) {
  var vehicle;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          vehicle = new Vehicle(req.body);
          console.log('Saving a Vehicle...' + vehicle);
          _context.next = 5;
          return regeneratorRuntime.awrap(vehicle.save());

        case 5:
          res.status(201).json(vehicle);
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            error: _context.t0.message
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.viewVehicle = function _callee2(req, res) {
  var driverId, vehicles;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('view vehicles...');
          _context2.prev = 1;
          driverId = req.query.driverId; // Get driverId from query params

          console.log("Received driverId:", driverId);

          if (driverId) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: 'Driver ID is required'
          }));

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(Vehicle.find({
            driverId: driverId
          }));

        case 8:
          vehicles = _context2.sent;
          // Fetch only vehicles that match driverId
          res.json(vehicles);
          _context2.next = 15;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          res.status(500).json({
            error: _context2.t0.message
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

exports.disableVehicle = function _callee3(req, res) {
  var vehicleId, updatedVehicle;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          vehicleId = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Vehicle.findByIdAndUpdate(vehicleId, {
            isActive: false
          }, {
            "new": true
          } // Returns the updated document
          ));

        case 4:
          updatedVehicle = _context3.sent;

          if (updatedVehicle) {
            _context3.next = 7;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'Booking not found'
          }));

        case 7:
          res.json({
            message: "Vehicle disabled successfully",
            vehicle: updatedVehicle
          });
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          console.error("Error Vehicledisabling :", _context3.t0);
          res.status(500).json({
            error: 'Server error'
          });

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 10]]);
};

exports.deleteVehicle = function _callee4(req, res) {
  var vehicleId, deletedVehicle;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          vehicleId = req.params.id;

          if (mongoose.Types.ObjectId.isValid(vehicleId)) {
            _context4.next = 4;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: 'Invalid Vehicle ID'
          }));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(Vehicle.findByIdAndDelete(vehicleId));

        case 6:
          deletedVehicle = _context4.sent;

          if (deletedVehicle) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            message: 'Vehicle not found'
          }));

        case 9:
          res.json({
            message: "Vehicle deleted successfully",
            vehicle: deletedVehicle
          });
          _context4.next = 16;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          console.error("Error deleting vehicle:", _context4.t0);
          res.status(500).json({
            error: 'Server error'
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
};

exports.getVehicles = function _callee5(req, res) {
  var vehicles;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Vehicle.find({
            driverId: req.params.driverId,
            isActive: true
          }));

        case 3:
          vehicles = _context5.sent;
          res.json(vehicles);
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: "Server error"
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
};