import * as alt from 'alt-server';
import * as Athena from '@AthenaServer/api';

import { HUDController } from './src/controller';

Athena.systems.plugins.registerPlugin('HUD', async () => {});

Athena.player.events.on('selected-character', (player: alt.Player) => {
    HUDController.openHUD(player);
    setTimeout(() => {
        HUDController.updateHUD(player);
    }, 1500);
});

Athena.document.character.onChange('armour', (player: alt.Player, _value: number, _oldValue: number) => {
    HUDController.updateHUD(player);
});

Athena.document.character.onChange('food', (player: alt.Player, _value: number, _oldValue: number) => {
    HUDController.updateHUD(player);
});

Athena.document.character.onChange('water', (player: alt.Player, _value: number, _oldValue: number) => {
    HUDController.updateHUD(player);
});

Athena.document.character.onChange('cash', (player: alt.Player, _value: number, _oldValue: number) => {
    HUDController.updateHUD(player);

    alt.logWarning(`Changed Cash`);
});

Athena.document.character.onChange('bank', (player: alt.Player, _value: number, _oldValue: number) => {
    HUDController.updateHUD(player);

    alt.logWarning(`Changed Bank`);
});

Athena.document.character.onChange('dimension', (player: alt.Player, _value: number, _oldValue: number) => {
    HUDController.updateHUD(player);
});
