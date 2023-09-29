/**
 * Events fired when a bubble comment changes size.
 *
 * @class
 */

import type {AbstractEventJson} from './events_abstract.js';
import type {BlockSvg} from '../block_svg.js';
import * as registry from '../registry.js';
import {UiBase} from './events_ui_base.js';
import * as eventUtils from './utils.js';
import type {Workspace} from '../workspace.js';
import { Size } from '../utils.js';

/**
 * Class for when a comment changes size.
 */
export class BubbleCommentResize extends UiBase {
  /** The ID of the block the bubble is attached to. */
  blockId?: string;

  /** The old size of the comment bubble, before it was resized */
  oldSize?: Size;

  /** The new size of the comment bubble, after it has been resized */
  newSize?: Size;

  override type = eventUtils.BUBBLE_COMMENT_RESIZE;

  /**
   * @param opt_block The associated block. Undefined for a blank event.
   * @param opt_old_size The old size of the bubble comment
   * @param opt_new_size The new size of the bubble comment
   */
  constructor(
    opt_block?: BlockSvg,
    opt_old_size?: Size,
    opt_new_size?: Size
  ) {
    const workspaceId = opt_block ? opt_block.workspace.id : undefined;
    super(workspaceId);
    if (!opt_block) return;
    this.oldSize = opt_old_size;
    this.newSize = opt_new_size;
    this.blockId = opt_block.id;
  }

  /**
   * Encode the event as JSON.
   *
   * @returns JSON representation.
   */
  override toJson(): BubbleCommentResizeJson {
    const json = super.toJson() as BubbleCommentResizeJson;
    if (this.oldSize === undefined || this.newSize === undefined) {
      throw new Error(
        'Whether this event is for opening the bubble is undefined. ' +
          'Either pass the value to the constructor, or call fromJson',
      );
    }

    json['oldSize'] = this.oldSize;
    json['newSize'] = this.newSize;
    json['blockId'] = this.blockId || '';
    return json;
  }

  /**
   * Deserializes the JSON event.
   *
   * @param event The event to append new properties to. Should be a subclass
   *     of BubbleCommentResize, but we can't specify that due to the fact that
   *     parameters to static methods in subclasses must be supertypes of
   *     parameters to static methods in superclasses.
   * @internal
   */
  static fromJson(
    json: BubbleCommentResizeJson,
    workspace: Workspace,
    event?: any,
  ): BubbleCommentResize {
    const newEvent = super.fromJson(
      json,
      workspace,
      event ?? new BubbleCommentResize(),
    ) as BubbleCommentResize;
    newEvent.oldSize = json['oldSize'];
    newEvent.newSize = json['newSize'];
    newEvent.blockId = json['blockId'];
    return newEvent;
  }
}

export interface BubbleCommentResizeJson extends AbstractEventJson {
  oldSize: Size;
  newSize: Size;
  blockId: string;
}

registry.register(registry.Type.EVENT, eventUtils.BUBBLE_COMMENT_RESIZE, BubbleCommentResize);
