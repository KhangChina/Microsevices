import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Location VietNam')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }
  @Get('province')
  findAll() {
    const data = fs.readFileSync('./src/location/json/province.json', 'utf-8')
    let province = JSON.parse(data)
    var newData = province.map(function (item) {
      return {
        "ID": item["Mã"],
        "name": item["Tên"],
        "level": item["Cấp"]
      };
    });
    return {
      data: {
        item: newData
      }
    }
  }
  @Get('district/province/:provinceID')
  findDistrictByProvinceID(@Param('provinceID') provinceID: string) {
    const data = fs.readFileSync('./src/location/json/district.json', 'utf-8')
    let district = JSON.parse(data)
    var newData = district.map(function (item) {
      return {
        "ID": item["Mã"],
        "name": item["Tên"],
        "level": item["Cấp"],
        "provinceID": item["Mã TP"]
      };
    });
    const res = newData.filter((item) => item.provinceID === provinceID)
    return {
      data: {
        item: res
      }
    }
  }

  @Get('commune/district/:districtID')
  findCommuneByDistrictID(@Param('districtID') districtID: string) {
    const data = fs.readFileSync('./src/location/json/commune.json', 'utf-8')
    let commune = JSON.parse(data)
    var newData = commune.map(function (item) {
      return {
        "ID": item["Mã"],
        "name": item["Tên"],
        "level": item["Cấp"],
        "districtID": item["Mã QH"]
      };
    });
    const res = newData.filter((item) => item.districtID === districtID)
    return {
      data: {
        item: res
      }
    }

  }

  @Get('province/:ID')
  async findOneProvince(@Param('ID') ID: string) {
    const dataRead = fs.readFileSync('./src/location/json/province.json', 'utf-8')
    let province = JSON.parse(dataRead)
    let data: any = province.find(item => item["Mã"] == ID)
    if (data) {
      return {
        statusCode: 200, message: 'Get one data success', data: {
          "ID": data["Mã"],
          "name": data["Tên"],
          "level": data["Cấp"]
        }
      };
    }
    throw new HttpException("Not found !", HttpStatus.NOT_FOUND)
  }
  @Get('commune/:ID')
  async findOneCommune(@Param('ID') ID: string) {
    const dataRead = fs.readFileSync('./src/location/json/commune.json', 'utf-8')
    let commune = JSON.parse(dataRead)
    let data = commune.find(item => item["Mã"] == ID)
    if (data)
    {
      return {
        statusCode: 200, message: 'Get one data success', data: {
          "ID": data["Mã"],
          "name": data["Tên"],
          "level": data["Cấp"],
          "districtID": data["Mã QH"],
        }
      };
    }
    throw new HttpException("Not found !", HttpStatus.NOT_FOUND)
  }

  @Get('district/:ID')
  async findOneDistrict(@Param('ID') ID: string)
  {
    const dataRead = fs.readFileSync('./src/location/json/district.json', 'utf-8')
    let district = JSON.parse(dataRead)
    let data = district.find(item => item["Mã"] == ID)
    if(data)
    return {
      "ID": data["Mã"],
      "name": data["Tên"],
      "level": data["Cấp"],
      "provinceID": data["Mã TP"],
    };
    throw new HttpException("Not found", HttpStatus.NOT_FOUND)
  }
}
