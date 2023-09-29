/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {defineMutatorBlocks} from './test_helpers/block_definitions.js';
import {
  sharedTestSetup,
  sharedTestTeardown,
} from './test_helpers/setup_teardown.js';

suite('Bubble Comment Resize Event', function () {
  setup(function () {
    sharedTestSetup.call(this);
    defineMutatorBlocks();
    this.workspace = new Blockly.Workspace();
  });

  teardown(function () {
    sharedTestTeardown.call(this);
    Blockly.Extensions.unregister('xml_mutator');
    Blockly.Extensions.unregister('jso_mutator');
  });

  suite('Serialization', function () {
    test('events round-trip through JSON', function () {
      const block = this.workspace.newBlock('jso_block', 'block_id');
      const origEvent = new Blockly.Events.BubbleCommentResize(
        block,
        {width: 100, height: 80},
        {width: 120, height: 100},
      );

      const json = origEvent.toJson();
      const newEvent = new Blockly.Events.fromJson(json, this.workspace);

      chai.assert.deepEqual(newEvent, origEvent);
    });
  });
});
