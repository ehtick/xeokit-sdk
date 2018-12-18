/*
 * A minimal app that loads a glTF file and then loads a BCF viewpoint
 */

import {Viewer} from "../../../src/viewer/Viewer.js";
import {GLTFLoaderPlugin} from "../../../src/viewer/plugins/GLTFLoaderPlugin/GLTFLoaderPlugin.js";
import {BCFViewpointsPlugin} from "../../../src/viewer/plugins/BCFViewpointsPlugin/BCFViewpointsPlugin.js";

const bcfViewpoint = {
    "perspective_camera": {
        "camera_view_point": {"x": -2.36, "y": 18.96, "z": -26.12},
        "camera_direction": {"x": 10.97, "y": 5.82, "z": -11.22},
        "camera_up_vector": {"x": 0.36, "y": 0.82, "z": 0.40},
        "field_of_view": 60
    },
    "orthogonal_camera": {
        "camera_view_point": {"x": -2.36, "y": 18.96, "z": -26.12},
        "camera_direction": {"x": 10.97, "y": 5.82, "z": -11.22},
        "camera_up_vector": {"x": 0.36, "y": 0.82, "z": 0.40},
        "view_to_world_scale": 1
    },
    "lines": [],
    "bitmaps": [],
    "clipping_planes": [
        {
            "location": {"x": 0, "y": 0, "z": 0},
            "direction": {"x": 0.5, "y": 0, "z": 0.5}
        }
    ],
    "components": {
        "visibility": {
            "view_setup_hints": {
                "spaces_visible": false,
                "space_boundaries_visible": false,
                "openings_visible": false
            },
            "exceptions": [],
            "default_visibility": true
        },
        "selection": [
            {
                "ifc_guid": "product-d5af753d-e8ff-467d-951c-bc66b940831a-body",
                "originating_system": "xeogl",
                "authoring_tool_id": "xeogl"
            },
            {
                "ifc_guid": "product-4d959014-d715-4be0-9646-04ddb9384fe7-body",
                "originating_system": "xeogl",
                "authoring_tool_id": "xeogl"
            },
            {
                "ifc_guid": "product-42df0fcb-3410-43c8-af51-84653eecbfa3-body",
                "originating_system": "xeogl",
                "authoring_tool_id": "xeogl"
            },
            {
                "ifc_guid": "product-05f386ae-4fb9-420a-8bc7-c7b76aa264e6-body",
                "originating_system": "xeogl",
                "authoring_tool_id": "xeogl"
            },
            {
                "ifc_guid": "product-bc6847c1-5f7c-48ce-8f58-7834d0f8cc1c-body",
                "originating_system": "xeogl",
                "authoring_tool_id": "xeogl"
            }
        ]
    },
    "snapshot": {
        "snapshot_type": "png",
        "snapshot_data": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABC8AAAO5CAYAAAA5KQ/tAAAgAElEQVR4Xu3YMREAAAwCseLfdG38kCrgUiZ2jgABAgQIECBAgAABAgQIECAQFlg4m2gECBAgQIAAAQIECBAgQIAAgTNeKAEBAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIKTrCzkAACAASURBVGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBnwZwngAADoJJREFUtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0gPEi/R7hCBAgQIAAAQIECBAgQIAAAeOFDhAgQIAAAQIECBAgQIAAAQJpAeNF+j3CESBAgAABAgQIECBAgAABAsYLHSBAgAABAgQIECBAgAABAgTSAsaL9HuEI0CAAAECBAgQIECAAAECBIwXOkCAAAECBAgQIECAAAECBAikBYwX6fcIR4AAAQIECBAgQIAAAQIECBgvdIAAAQIECBAgQIAAAQIECBBICxgv0u8RjgABAgQIECBAgAABAgQIEDBe6AABAgQIECBAgAABAgQIECCQFjBepN8jHAECBAgQIECAAAECBAgQIGC80AECBAgQIECAAAECBAgQIEAgLWC8SL9HOAIECBAgQIAAAQIECBAgQMB4oQMECBAgQIAAAQIECBAgQIBAWsB4kX6PcAQIECBAgAABAgQIECBAgIDxQgcIECBAgAABAgQIECBAgACBtIDxIv0e4QgQIECAAAECBAgQIECAAAHjhQ4QIECAAAECBAgQIECAAAECaQHjRfo9whEgQIAAAQIECBAgQIAAAQLGCx0gQIAAAQIECBAgQIAAAQIE0gLGi/R7hCNAgAABAgQIECBAgAABAgSMFzpAgAABAgQIECBAgAABAgQIpAWMF+n3CEeAAAECBAgQIECAAAECBAgYL3SAAAECBAgQIECAAAECBAgQSAsYL9LvEY4AAQIECBAgQIAAAQIECBAwXugAAQIECBAgQIAAAQIECBAgkBYwXqTfIxwBAgQIECBAgAABAgQIECBgvNABAgQIECBAgAABAgQIECBAIC1gvEi/RzgCBAgQIECAAAECBAgQIEDAeKEDBAgQIECAAAECBAgQIECAQFrAeJF+j3AECBAgQIAAAQIECBAgQICA8UIHCBAgQIAAAQIECBAgQIAAgbSA8SL9HuEIECBAgAABAgQIECBAgAAB44UOECBAgAABAgQIECBAgAABAmkB40X6PcIRIECAAAECBAgQIECAAAECxgsdIECAAAECBAgQIECAAAECBNICxov0e4QjQIAAAQIECBAgQIAAAQIEjBc6QIAAAQIECBAgQIAAAQIECKQFjBfp9whHgAABAgQIECBAgAABAgQIGC90gAABAgQIECBAgAABAgQIEEgLGC/S7xGOAAECBAgQIECAAAECBAgQMF7oAAECBAgQIECAAAECBAgQIJAWMF6k3yMcAQIECBAgQIAAAQIECBAgYLzQAQIECBAgQIAAAQIECBAgQCAtYLxIv0c4AgQIECBAgAABAgQIECBAwHihAwQIECBAgAABAgQIECBAgEBawHiRfo9wBAgQIECAAAECBAgQIECAgPFCBwgQIECAAAECBAgQIECAAIG0wANpxwO6ikRKYQAAAABJRU5ErkJggg=="
    }
};

// Create a xeokit Viewer
const viewer = new Viewer({
    canvasId: "myCanvas"
});

// Add a GLTFModelsPlugin
const glTFModels = new GLTFLoaderPlugin(viewer);

// Add a BCFViewpointsPlugin
const bcfViewpoints = new BCFViewpointsPlugin(viewer);

// Load a glTF model
const model = glTFModels.load({
    id: "myModel",
    src: "./../../models/gltf/schependomlaan/schependomlaan.gltf",
    edges: true
});

// When the model has loaded, load the BCF viewpoint
model.on("loaded", () => {
    bcfViewpoints.setViewpoint(bcfViewpoint);
});
