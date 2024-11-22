import {Tourist} from "../../adventurer/models/tourist.model";
import {Agency} from "./agency.model";
import {Route} from "./route.model";

export interface Boot{
    id: number,
    code: number,
    state: string,
    batery: number,
    steps: number,
    latitude: number,
    longitude:number,
    distance:number,
    heartRate:number,
    temperature:number,
    tourist:Tourist,
    service:Route,
    agency:Agency

}
