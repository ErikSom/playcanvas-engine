import { Vec3 } from '../math/vec3.js';

/** @typedef {import('./ray.js').Ray} Ray */

const tmpVecA = new Vec3();

/**
 * An infinite plane.
 *
 * @ignore
 */
class Plane {
    /**
     * Create a new Plane instance.
     *
     * @param {Vec3} [point] - Point position on the plane. The constructor takes a reference of
     * this parameter.
     * @param {Vec3} [normal] - Normal of the plane. The constructor takes a reference of this
     * parameter.
     */
    constructor(point = new Vec3(), normal = new Vec3(0, 0, 1)) {
        this.point = point;
        this.normal = normal;
    }

    /**
     * Test if the plane intersects between two points.
     *
     * @param {Vec3} start - Start position of line.
     * @param {Vec3} end - End position of line.
     * @param {Vec3} [point] - If there is an intersection, the intersection point will be copied
     * into here.
     * @returns {boolean} True if there is an intersection.
     */
    intersectsLine(start, end, point) {
        const d = -this.normal.dot(this.point);
        const d0 = this.normal.dot(start) + d;
        const d1 = this.normal.dot(end) + d;

        const t = d0 / (d0 - d1);
        const intersects = t >= 0 && t <= 1;
        if (intersects && point)
            point.lerp(start, end, t);

        return intersects;
    }

    /**
     * Test if a ray intersects with the infinite plane.
     *
     * @param {Ray} ray - Ray to test against (direction must be normalized).
     * @param {Vec3} [point] - If there is an intersection, the intersection point will be copied
     * into here.
     * @returns {boolean} True if there is an intersection.
     */
    intersectsRay(ray, point) {
        const pointToOrigin = tmpVecA.sub2(this.point, ray.origin);
        const t = this.normal.dot(pointToOrigin) / this.normal.dot(ray.direction);
        const intersects = t >= 0;

        if (intersects && point)
            point.copy(ray.direction).mulScalar(t).add(ray.origin);

        return intersects;
    }
}

export { Plane };
