import { EventEmitter } from '@angular/core';
import { Slice } from './slices/slice/slice.model';

export class SlicesService {
    sliceUpdated = new EventEmitter<void>();

    slices: Slice[] = [
        new Slice(1, 'Pizza', '#ffbe00', 1),
        new Slice(2, 'Pie', '#afbedd', 1),
        new Slice(3, 'Cake', '#0c78e4', 1)
    ];

    getRandomColor() {
        return '#' + Math.floor(0xFFFFFF * Math.random()).toString(16);
    }

    getRandomHSLColor() {
        return 'hsl(' + Math.random() * 360 + ', 100%, 75%)';
    }

    hslToHex(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            // tslint:disable-next-line:no-shadowed-variable
            const hue2rgb = (p, q, t) => {
            if (t < 0) { t += 1; }
            if (t > 1) { t -= 1; }
            if (t < 1 / 6) { return p + (q - p) * 6 * t; }
            if (t < 1 / 2) { return q; }
            if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
            return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        const toHex = x => {
            const hex = Math.round(x * 255).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    addSlice() {
        // this.slices.push({id: this.slices.length + 1, label: 'change me!', color: this.getRandomHSLColor(), size: 1});
        this.slices.push({id: this.slices.length + 1, label: 'change me!', color: this.hslToHex(Math.random() * 360, 100, 75), size: 1});
    }

    deleteSlice(slice: Slice) {
        this.slices.splice( this.slices.indexOf(slice), 1 );
    }

    selectSlice(slice: Slice) {
        console.log('slice selected');
        console.log(slice);
    }
}
