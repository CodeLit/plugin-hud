import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import { HUDController } from './controller';

const HUDFunctions = {
    updateHUD,
};

function updateHUD(player: alt.Player) {
    return HUDController.updateHUD(player);
}

Athena.systems.plugins.addAPI('HUD', HUDFunctions);

declare global {
    export interface ServerPluginAPI {
        ['HUD-API']: typeof HUDFunctions;
    }
}
