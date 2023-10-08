import * as alt from 'alt-client';
import * as native from 'natives';

import * as AthenaClient from '@AthenaClient/api';
import { onTicksStart } from '@AthenaClient/events/onTicksStart';
import { HUD_EVENTS } from '../shared/events';

const isMetric = native.getProfileSetting(227);
let speedCalc: string;

function init() {
    const page = new AthenaClient.webview.Page({
        name: 'HUD',
        callbacks: {
            onReady: async () => {},
            onClose: () => {},
        },
        options: {
            onOpen: {
                focus: false,
                hideHud: false,
                hideOverlays: false,
                setIsMenuOpenToTrue: false,
                showCursor: false,
                disableControls: 'none',
                disablePauseMenu: false,
                forceOpen: true,
            },
            onClose: {
                showOverlays: false,
            },
            disableEscapeKey: true,
        },
    });

    alt.onServer(HUD_EVENTS.OPEN_HUD, () => {
        if (typeof page !== 'undefined') {
            page.open();
        }
    });

    alt.onServer(HUD_EVENTS.CLOSE_HUD, () => {
        if (typeof page !== 'undefined') {
            page.close(true);
        }
    });
}

onTicksStart.add(init);

alt.everyTick(() => {
    if (!alt.Player.local.vehicle) return;
    const currentSpeed = native.getEntitySpeed(alt.Player.local.vehicle);

    speedCalc = (currentSpeed * (isMetric ? 3.6 : 2.236936)).toFixed(0);
    AthenaClient.webview.emit(HUD_EVENTS.UPDATE_SPEED, speedCalc);
});
