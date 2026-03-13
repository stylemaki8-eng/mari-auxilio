const CONFIG = { MAX_DELTA: 200, NOISE_THRESHOLD: 0.8, LINEAR_SENS: 1.0 };

function getBezierPoint(t, p0, p1, p2) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
}

export const processTouch = (delta, speed, settings) => {
    if (Math.abs(delta) < CONFIG.NOISE_THRESHOLD) return 0;
    let clampedDelta = Math.max(Math.min(delta, CONFIG.MAX_DELTA), -CONFIG.MAX_DELTA);
    let t = Math.min(speed / (settings.fps120 ? 15 : 10), 1);
    let p1_mult = settings.aimTrick ? 0.9 : 0.6;
    return getBezierPoint(t, clampedDelta * 0.3, clampedDelta * p1_mult, clampedDelta);
};
