import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { SlicesService } from '../slices.service';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.css']
})
export class WheelComponent implements OnInit {

  @Input() spinMulti: number;

  rotation = 0;
  oldrotation = 0;
  picked = 100000;
  oldpick = [];
  data = this.slicesService.slices;

  constructor(private slicesService: SlicesService) { }

  ngOnInit() {
    this.slicesService.sliceUpdated
      .subscribe(
        () => {
          this.buildWheel();
        }
      );

    this.buildWheel();
  }

  buildWheel = () => {
    this.resetWheel();
    const svg = d3.selectAll('svg'),
    width = 720,
    height = 720,
    padding = {top: 0, right: 50, bottom: 0, left: 0},
    radius = Math.min(width, height) / 2;

    svg.attr('width',  width + padding.left + padding.right)
      .attr('height', height + padding.top + padding.bottom)
      .attr('viewBox', '0 0 ' + (width + padding.left + padding.right) + ' ' + (height + padding.top + padding.bottom));

    const container = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
      .attr('class', 'chartholder');

    const vis = container.append('g')
      .attr('class', 'slicesholder');

    const pie = d3.pie().value(function (d) { return d.size; })(this.data);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = vis.selectAll('g.slice')
      .data(pie)
      .enter()
        .append('g')
        .attr('class', 'slice')
        .each(function(d) { return this._current = d; });

    arcs.append('path')
      .attr('fill', function (d, i) {
        return d.data.color;
      })
      .on('click', (d, i) => {
        return this.onSliceClick(d);
      })
      .attr('d', arc);

    arcs.append('text')
      .text(function (d, i) {
        return d.data.label;
      })
      .attr('transform', function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
        d.angle = (d.startAngle + d.endAngle) / 2;
        return 'rotate(' + (d.angle * 180 / Math.PI - 90) + ') translate(' + (d.outerRadius - 10) + ')';
      })
      .attr('text-anchor', 'end');

    // make arrow
    svg.append('g')
      .attr('transform', 'translate(' + (width + padding.left + padding.right) + ',' + ((height / 2) + padding.top) + ')')
      .attr('class', 'arrow-select')
      .append('path')
      .attr('d', 'M-' + (radius * .15) + ',0L0,' + (radius * .05) + 'L0,-' + (radius * .05) + 'Z')
      .style({'fill': 'black'});

    // draw spin circle
    container.append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 60)
      .attr('class', 'spin-button')
      .style('fill', '#fff')
      .style('cursor', 'pointer');

    // spin text
    container.append('text')
      .attr('x', 0)
      .attr('y', 10)
      .attr('text-anchor', 'middle')
      .attr('class', 'spin-text')
      .text('SPIN!')
      .style('font-weight', 'bold')
      .style('font-size', '30px');

      d3.select('.spin-button').on('click', this.spin);
  }

  resetWheel = () => {
    this.rotation = 0;
    this.oldrotation = 0;
    this.picked = 0;
    this.oldpick = [];
    d3.selectAll('.chartholder').remove();
    d3.selectAll('.spin-button').remove();
    d3.selectAll('.spin-text').remove();
    d3.selectAll('.arrow-select').remove();
  }

  spin = () => {
    const svg = d3.selectAll('svg');
    const container = svg.selectAll('g');
    const vis = container.select('.slicesholder');
    const spinButton = d3.select('.spin-button');

    spinButton.on('click', null);

    // all slices have been seen, all done
    console.log('OldPick: ' + this.oldpick.length, 'Data length: ' + this.data.length);
    if (this.oldpick.length === this.data.length) {
      console.log('done');
      this.buildWheel();
      spinButton.on('click', null);
      return;
    }

    const ps = 360 / this.data.length;
    const rng = Math.floor((Math.random() * 1440) + 360 * this.spinMulti);
    console.log('pie slice: ' + ps);
    console.log('rng: ' + rng);

    this.rotation = (Math.round(rng / ps) * ps);

    this.picked = Math.round(this.data.length - (this.rotation % 360) / ps);
    this.picked = this.picked >= this.data.length ? (this.picked % this.data.length) : this.picked;

    if (this.oldpick.indexOf(this.picked) !== -1) {
      d3.select(this).call(this.spin);
      return;
    } else {
      this.oldpick.push(this.picked);
    }

    this.rotation += 90 - Math.round(ps / 2);

    vis.transition()
      .duration(2000 + 1000 * this.spinMulti)
      .attrTween('transform', () => {
          const i = d3.interpolate(this.oldrotation % 360, this.rotation);
          return function(t) {
            return 'rotate(' + i(t) + ')';
          };
        })
        .each(() => {
          console.log('Picked : ' + this.picked);
        })
        .on('end', () => {
          d3.select('.slice:nth-child(' + (this.picked + 1) + ') path')
            .attr('fill', '#888');

          d3.select('#question')
                .text(this.data[this.picked].label);

          if (this.oldpick.length === this.data.length) {
            d3.selectAll('.spin-text').text('RESET');
          }

          this.oldrotation = this.rotation;

          spinButton.on('click', this.spin);
        });

  }

  onSliceClick(d) {
    this.slicesService.selectSlice(d.data);
  }

}
