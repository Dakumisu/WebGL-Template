import Webgl from '@js/webgl/Webgl';

import loadModel from '@utils/loader/loadGLTF';

import { store } from '@js/tools/Store';

import model from '/assets/model/model.glb';

let initialized = false;

export default class Model {
	constructor(opt = {}) {
		const webgl = new Webgl();
		this.scene = webgl.scene;

		this.object = {};

		this.load();

		initialized = true;

		/// #if DEBUG
		const debug = webgl.debug;
		this.debug(debug);
		/// #endif
	}

	/// #if DEBUG
	debug(debug) {}
	/// #endif

	load() {
		loadModel(model).then((response) => {
			this.object.mesh = response;
			this.object.mesh.position.set(0, -2, 0);
			this.scene.add(this.object.mesh);
		});
	}

	addObject(object) {
		this.scene.add(object);
	}

	update(et) {
		if (!initialized) return;
	}
}
