class Renderer {
  // canvas:              object ({id: __, width: __, height: __})
  // num_curve_sections:  int
  constructor(canvas, num_curve_sections, show_points_flag) {
    this.canvas = document.getElementById(canvas.id);
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true });
    this.slide_idx = 0;
    this.num_curve_sections = num_curve_sections;
    this.show_points = show_points_flag;
  }

  // n:  int
  setNumCurveSections(n) {
    this.num_curve_sections = n;
    this.drawSlide(this.slide_idx);
  }

  // flag:  bool
  showPoints(flag) {
    this.show_points = flag;
    this.drawSlide(this.slide_idx);
  }

  // slide_idx:  int
  drawSlide(slide_idx) {
    this.slide_idx = slide_idx;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let framebuffer = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    switch (this.slide_idx) {
      case 0:
        this.drawSlide0(framebuffer);
        break;
      case 1:
        this.drawSlide1(framebuffer);
        break;
      case 2:
        this.drawSlide2(framebuffer);
        break;
      case 3:
        this.drawSlide3(framebuffer);
        break;
    }

    this.ctx.putImageData(framebuffer, 0, 0);
  }

  // framebuffer:  canvas ctx image data
  drawSlide0(framebuffer) {
    // TODO: draw at least 2 Bezier curves
    //   - variable `this.num_curve_sections` should be used for `num_edges`
    //   - variable `this.show_points` should be used to determine whether or not to render vertices

    const p = [
      { x: 120, y: 120 },
      { x: 200, y: 320 },
      { x: 600, y: 400 },
      { x: 520, y: 120 },
    ];

    if (this.show_points) {
      for (let i = 0; i < p.length; i++) {
        this.drawVertex(p[i], [0, 0, 0, 150], framebuffer);
      }
    }

    this.drawBezierCurve(p[0], p[1], p[2], p[3], this.num_curve_sections, [255, 0, 0, 255], framebuffer);
  }

  // framebuffer:  canvas ctx image data
  drawSlide1(framebuffer) {
    // TODO: draw at least 2 circles
    //   - variable `this.num_curve_sections` should be used for `num_edges`
    //   - variable `this.show_points` should be used to determine whether or not to render vertices

    const center = [
      { x: 150, y: 150 },
      { x: 400, y: 400 },
    ];

    const radius = [60, 150];

    this.drawCircle(center[0], radius[0], this.num_curve_sections, [0, 0, 0, 255], framebuffer);
    this.drawCircle(center[1], radius[1], this.num_curve_sections, [0, 0, 0, 255], framebuffer);
  }

  // framebuffer:  canvas ctx image data
  drawSlide2(framebuffer) {
    // TODO: draw at least 2 convex polygons (each with a different number of vertices >= 5)
    //   - variable `this.show_points` should be used to determine whether or not to render vertices

    const vertices = [
      { x: 20, y: 100 },
      { x: 200, y: 120 },
      { x: 360, y: 250 },
      { x: 290, y: 350 },
      { x: 160, y: 400 },
      { x: 60, y: 210 },
    ];

    const vertices2 = [
      { x: 2020, y: 60 },
      { x: 2200, y: 140 },
      { x: 2360, y: 260 },
      { x: 2290, y: 330 },
      { x: 2160, y: 280 },
    ];

    this.drawConvexPolygon(vertices, [0, 128, 128, 255], framebuffer);
    this.drawConvexPolygon(vertices2, [255, 128, 128, 255], framebuffer);

    if (this.show_points) {
      for (let i = 0; i < vertices.length; i++) {
        this.drawVertex(vertices[i], [0, 0, 0, 150], framebuffer);
      }

      for (let i = 0; i < vertices2.length; i++) {
        this.drawVertex(vertices2[i], [0, 0, 0, 150], framebuffer);
      }
    }
  }

  // framebuffer:  canvas ctx image data
  drawSlide3(framebuffer) {
    // TODO: draw your name!
    //   - variable `this.num_curve_sections` should be used for `num_edges`
    //   - variable `this.show_points` should be used to determine whether or not to render vertices

    //draw S
    const sTop = [
      { x: 100, y: 400 },
      { x: 5, y: 400 },
      { x: 5, y: 300 },
      { x: 50, y: 300 },
    ];

    const sBottom = [
      { x: 50, y: 300 },
      { x: 100, y: 300 },
      { x: 100, y: 200 },
      { x: 5, y: 200 },
    ];

    this.drawBezierCurve(sTop[0], sTop[1], sTop[2], sTop[3], this.num_curve_sections, [0, 0, 0, 255], framebuffer);
    this.drawBezierCurve(
      sBottom[0],
      sBottom[1],
      sBottom[2],
      sBottom[3],
      this.num_curve_sections,
      [0, 0, 0, 255],
      framebuffer
    );

    if (this.show_points) {
      for (let i = 0; i < 4; i++) {
        this.drawVertex(sTop[i], [0, 0, 0, 150], framebuffer);
        this.drawVertex(sBottom[i], [0, 0, 0, 150], framebuffer);
      }
    }

    //draw a

    const center = { x: 150, y: 250 };
    const radius = 50;
    this.drawCircle(center, radius, this.num_curve_sections, [0, 0, 0, 255], framebuffer);
    this.drawLine({ x: 200, y: 290 }, { x: 200, y: 210 }, [0, 0, 0, 255], framebuffer);
    if (this.show_points) {
      this.drawVertex({ x: 200, y: 290 }, [0, 0, 0, 150], framebuffer);
      this.drawVertex({ x: 200, y: 210 }, [0, 0, 0, 150], framebuffer);
    }

    //draw M

    const mLeft = [
      { x: 220, y: 200 },
      { x: 260, y: 300 },
      { x: 300, y: 200 },
    ];

    const mRight = [
      { x: 290, y: 200 },
      { x: 330, y: 300 },
      { x: 370, y: 200 },
    ];

    this.drawConvexPolygon(mLeft, [0, 0, 0, 255], framebuffer);
    this.drawConvexPolygon(mRight, [0, 0, 0, 255], framebuffer);

    if (this.show_points) {
      for (let i = 0; i < 3; i++) {
        this.drawVertex(mLeft[i], [0, 0, 0, 150], framebuffer);
        this.drawVertex(mRight[i], [0, 0, 0, 150], framebuffer);
      }
    }
  }

  // p0:           object {x: __, y: __}
  // p1:           object {x: __, y: __}
  // p2:           object {x: __, y: __}
  // p3:           object {x: __, y: __}
  // num_edges:    int
  // color:        array of int [R, G, B, A]
  // framebuffer:  canvas ctx image data
  drawBezierCurve(p0, p1, p2, p3, num_edges, color, framebuffer) {
    // TODO: draw a sequence of straight lines to approximate a Bezier curve
    // Initialize variables
    const pts = [];
    let prev = p0;

    for (let i = 0; i <= num_edges; i++) {
      const t = i / num_edges;
      const x = parseInt(
        Math.pow(1 - t, 3) * p0.x +
          3 * Math.pow(1 - t, 2) * t * p1.x +
          3 * (1 - t) * Math.pow(t, 2) * p2.x +
          Math.pow(t, 3) * p3.x
      );

      const y = parseInt(
        Math.pow(1 - t, 3) * p0.y +
          3 * Math.pow(1 - t, 2) * t * p1.y +
          3 * (1 - t) * Math.pow(t, 2) * p2.y +
          Math.pow(t, 3) * p3.y
      );
      const point = { x, y };
      pts[i] = point;

      if (i > 0) {
        this.drawLine(prev, point, color, framebuffer);
      }
      prev = point;
    }
  }

  // center:       object {x: __, y: __}
  // radius:       int
  // num_edges:    int
  // color:        array of int [R, G, B, A]
  // framebuffer:  canvas ctx image data
  drawCircle(center, radius, num_edges, color, framebuffer) {
    // TODO: draw a sequence of straight lines to approximate a circle
    const angle = (2 * Math.PI) / num_edges;

    for (let i = 0; i < num_edges; i++) {
      let phi = i * angle;
      const x1 = parseInt(center.x + radius * Math.cos(phi));
      const y1 = parseInt(center.y + radius * Math.sin(phi));
      const x2 = parseInt(center.x + radius * Math.cos(phi + angle));
      const y2 = parseInt(center.y + radius * Math.sin(phi + angle));

      this.drawLine({ x: x1, y: y1 }, { x: x2, y: y2 }, color, framebuffer);
      if (this.show_points) this.drawVertex({ x: x1, y: y1 }, [0, 0, 0, 150], framebuffer);
    }
  }

  // vertex_list:  array of object [{x: __, y: __}, {x: __, y: __}, ..., {x: __, y: __}]
  // color:        array of int [R, G, B, A]
  // framebuffer:  canvas ctx image data
  drawConvexPolygon(vertex_list, color, framebuffer) {
    // TODO: draw a sequence of triangles to form a convex polygon

    let point_a = vertex_list[0];
    let point_b = vertex_list[1];
    let point_c = vertex_list[2];
    this.drawTriangle(point_a, point_b, point_c, color, framebuffer);
    for (let i = 3; i < vertex_list.length; i++) {
      point_b = point_c;
      point_c = vertex_list[i];
      this.drawTriangle(point_a, point_b, point_c, color, framebuffer);
    }
  }

  // v:            object {x: __, y: __}
  // color:        array of int [R, G, B, A]
  // framebuffer:  canvas ctx image data
  drawVertex(v, color, framebuffer) {
    // TODO: draw some symbol (e.g. small rectangle, two lines forming an X, ...) centered at position `v`
    this.drawLine({ x: v.x - 3, y: v.y - 3 }, { x: v.x + 3, y: v.y + 3 }, color, framebuffer);
    this.drawLine({ x: v.x - 3, y: v.y + 3 }, { x: v.x + 3, y: v.y - 3 }, color, framebuffer);
  }

  /***************************************************************
   ***       Basic Line and Triangle Drawing Routines          ***
   ***       (code provided from in-class activities)          ***
   ***************************************************************/
  pixelIndex(x, y, framebuffer) {
    return 4 * y * framebuffer.width + 4 * x;
  }

  setFramebufferColor(framebuffer, px, color) {
    framebuffer.data[px + 0] = color[0];
    framebuffer.data[px + 1] = color[1];
    framebuffer.data[px + 2] = color[2];
    framebuffer.data[px + 3] = color[3];
  }

  swapPoints(a, b) {
    let tmp = { x: a.x, y: a.y };
    a.x = b.x;
    a.y = b.y;
    b.x = tmp.x;
    b.y = tmp.y;
  }

  drawLine(p0, p1, color, framebuffer) {
    if (Math.abs(p1.y - p0.y) <= Math.abs(p1.x - p0.x)) {
      // |m| <= 1
      if (p0.x < p1.x) {
        this.drawLineLow(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
      } else {
        this.drawLineLow(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
      }
    } else {
      // |m| > 1
      if (p0.y < p1.y) {
        this.drawLineHigh(p0.x, p0.y, p1.x, p1.y, color, framebuffer);
      } else {
        this.drawLineHigh(p1.x, p1.y, p0.x, p0.y, color, framebuffer);
      }
    }
  }

  drawLineLow(x0, y0, x1, y1, color, framebuffer) {
    let A = y1 - y0;
    let B = x0 - x1;
    let iy = 1;
    if (A < 0) {
      iy = -1;
      A *= -1;
    }
    let D = 2 * A + B;
    let x = x0;
    let y = y0;
    let px;
    while (x <= x1) {
      px = this.pixelIndex(x, y, framebuffer);
      this.setFramebufferColor(framebuffer, px, color);
      x += 1;
      if (D <= 0) {
        D += 2 * A;
      } else {
        D += 2 * A + 2 * B;
        y += iy;
      }
    }
  }

  drawLineHigh(x0, y0, x1, y1, color, framebuffer) {
    let A = x1 - x0;
    let B = y0 - y1;
    let ix = 1;
    if (A < 0) {
      ix = -1;
      A *= -1;
    }
    let D = 2 * A + B;
    let x = x0;
    let y = y0;
    let px;
    while (y <= y1) {
      px = this.pixelIndex(x, y, framebuffer);
      this.setFramebufferColor(framebuffer, px, color);
      y += 1;
      if (D <= 0) {
        D += 2 * A;
      } else {
        D += 2 * A + 2 * B;
        x += ix;
      }
    }
  }

  drawTriangle(p0, p1, p2, color, framebuffer) {
    // Sort points in ascending y order
    if (p1.y < p0.y) this.swapPoints(p0, p1);
    if (p2.y < p0.y) this.swapPoints(p0, p2);
    if (p2.y < p1.y) this.swapPoints(p1, p2);

    // Edge coherence triangle algorithm
    // Create initial edge table
    let edge_table = [
      { x: p0.x, inv_slope: (p1.x - p0.x) / (p1.y - p0.y) }, // edge01
      { x: p0.x, inv_slope: (p2.x - p0.x) / (p2.y - p0.y) }, // edge02
      { x: p1.x, inv_slope: (p2.x - p1.x) / (p2.y - p1.y) }, // edge12
    ];

    // Do cross product to determine if pt1 is to the right/left of edge02
    let v01 = { x: p1.x - p0.x, y: p1.y - p0.y };
    let v02 = { x: p2.x - p0.x, y: p2.y - p0.y };
    let p1_right = v01.x * v02.y - v01.y * v02.x >= 0;

    // Get the left and right edges from the edge table (lower half of triangle)
    let left_edge, right_edge;
    if (p1_right) {
      left_edge = edge_table[1];
      right_edge = edge_table[0];
    } else {
      left_edge = edge_table[0];
      right_edge = edge_table[1];
    }
    // Draw horizontal lines (lower half of triangle)
    for (let y = p0.y; y < p1.y; y++) {
      let left_x = parseInt(left_edge.x) + 1;
      let right_x = parseInt(right_edge.x);
      if (left_x <= right_x) {
        this.drawLine({ x: left_x, y: y }, { x: right_x, y: y }, color, framebuffer);
      }
      left_edge.x += left_edge.inv_slope;
      right_edge.x += right_edge.inv_slope;
    }

    // Get the left and right edges from the edge table (upper half of triangle) - note only one edge changes
    if (p1_right) {
      right_edge = edge_table[2];
    } else {
      left_edge = edge_table[2];
    }
    // Draw horizontal lines (upper half of triangle)
    for (let y = p1.y; y < p2.y; y++) {
      let left_x = parseInt(left_edge.x) + 1;
      let right_x = parseInt(right_edge.x);
      if (left_x <= right_x) {
        this.drawLine({ x: left_x, y: y }, { x: right_x, y: y }, color, framebuffer);
      }
      left_edge.x += left_edge.inv_slope;
      right_edge.x += right_edge.inv_slope;
    }
  }
}
