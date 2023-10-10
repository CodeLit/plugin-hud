import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { HUD_EVENTS } from '@AthenaPlugins/plugin-hud/shared/events';

export class HUDController {
    static openHUD(player: alt.Player) {
        alt.emitClient(player, HUD_EVENTS.OPEN_HUD);
        this.updateHUD(player);
    }

    static updateHUD(player: alt.Player, veh?: alt.Vehicle) {
        try {
            const data = Athena.document.character.get(player);
            Athena.webview.emit(player, HUD_EVENTS.UPDATE_HUD, data);
        } catch (error) {
            alt.logWarning(`Error while updating HUD: ${error}!`);
        }
    }

    static updateVehicleHUD(player: alt.Player, vehicle: alt.Vehicle, remove = true) {
        try {
            const data = Athena.document.vehicle.get(vehicle);
            Athena.webview.emit(player, HUD_EVENTS.UPDATE_VEHICLE, data, remove);
        } catch (error) {
            alt.logWarning(`Error while updating HUD: ${error}!`);
        }
    }

    static closeHUD(player: alt.Player) {
        alt.emitClient(player, HUD_EVENTS.CLOSE_HUD);
    }
}
