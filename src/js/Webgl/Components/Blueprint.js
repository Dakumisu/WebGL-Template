import {
	Color,
	DoubleSide,
	Mesh,
	PlaneGeometry,
	ShaderMaterial,
	Vector2,
	Vector3,
} from 'three';

import Webgl from '@js/Webgl/Webgl';

import { store } from '@js/Tools/Store';

import blueprintMaterial from './materials/blueprint/blueprintMaterial';

const twoPI = Math.PI * 2;
const tVec3 = new Vector3();
const tVec2 = new Vector2();
const tCol = new Color();

let initialized = false;

const params = {
	color: '#ffffff',
};

/// #if DEBUG
const debug = {
	instance: null,
	label: 'Blueprint',
};
/// #endif

export default class Blueprint {
	constructor(opt = {}) {
		const webgl = new Webgl();
		this.scene = webgl.scene;

		this.object = {};

		this.setGeometry();
		this.setMaterial();
		this.setMesh();

		this.resize();

		initialized = true;

		/// #if DEBUG
		debug.instance = webgl.debug;
		this.debug();
		/// #endif
	}

	/// #if DEBUG
	debug() {}
	/// #endif

	setGeometry() {
		this.object.geometry = new PlaneGeometry(1, 1, 1, 1);
	}

	setMaterial() {
		const opts = {
			uniforms: {
				uTime: { value: 0 },
				uColor: { value: tCol.set(params.color) },
				uAlpha: { value: 1 },
				uResolution: {
					value: tVec3.set(
						store.resolution.width,
						store.resolution.height,
						store.resolution.dpr,
					),
				},
				uAspect: { value: tVec2.set(store.aspect.a1, store.aspect.a2) },
			},
			side: DoubleSide,
			transparent: true,
		};

		this.object.material = blueprintMaterial.get(opts);
	}

	setMesh() {
		this.object.mesh = new Mesh(this.object.geometry, this.object.material);

		this.scene.add(this.object.mesh);
	}

	resize() {
		if (!initialized) return;

		tVec3.set(
			store.resolution.width,
			store.resolution.height,
			store.resolution.dpr,
		);

		this.object.material.uniforms.uResolution.value = tVec3;
	}

	update(et) {
		if (!initialized) return;

		this.object.material.uniforms.uTime.value = et;
	}
}
