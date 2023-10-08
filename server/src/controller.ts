import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';
import { HUD_EVENTS } from '@AthenaPlugins/plugin-hud/shared/events';

export class HUDController {
    static updateHUD(player: alt.Player) {
        try {
            const data = Athena.document.character.get(player);
            Athena.webview.emit(player, HUD_EVENTS.UPDATE_HUD, data.bank, data.cash);
        } catch (error) {
            alt.logWarning(`Error while updating HUD: ${error}!`);
        }
    }
}
