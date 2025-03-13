<!-- 
    树与拖拽
-->

<template>
    <div class="tree-drag-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            treeData
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :groupDefaultExpanded="1"
            :getDataPath="getDataPath"
            :getRowId="getRowId"
            :autoGroupColumnDef="autoGroupColumnDef"
            @row-drag-end="onRowDragEnd"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
    import Vue from "vue";
    function arePathsEqual(path1, path2) {
        if (path1.length !== path2.length) {
            return false;
        }
        let equal = true;
        path1.forEach((item, index) => {
            if (path2[index] !== item) {
                equal = false;
            }
        });
        return equal;
    }
    function isSelectionParentOfTarget(selectedNode, targetNode) {
        let children = [...(selectedNode.childrenAfterGroup || [])];
        if (!targetNode) return false;
        while (children.length) {
            const node = children.shift();
            if (!node) {
                continue;
            }
            if (node.key === targetNode.key) {
                return true;
            }
            if (node.childrenAfterGroup && node.childrenAfterGroup.length) {
                children.push(...node.childrenAfterGroup);
            }
        }
        return false;
    }
    function moveToPath(newParentPath, node, allUpdatedNodes) {
        let oldPath = node.data.filePath;
        let fileName = oldPath[oldPath.length - 1];
        let newChildPath = newParentPath.slice();
        newChildPath.push(fileName);
        node.data.filePath = newChildPath;
        allUpdatedNodes.push(node.data);
        if (node.childrenAfterGroup) {
            node.childrenAfterGroup.forEach(node => {
                moveToPath(newChildPath, node, allUpdatedNodes);
            });
        }
    }
    const data = [
        { id: 1, filePath: ["Documents"], type: "folder" },
        { id: 2, filePath: ["Documents", "txt"], type: "folder" },
        {
            id: 3,
            filePath: ["Documents", "txt", "notes.txt"],
            type: "file",
            dateModified: "May 21 2017 01:50:00 PM",
            size: 14.7
        },
        { id: 4, filePath: ["Documents", "pdf"], type: "folder" },
        {
            id: 5,
            filePath: ["Documents", "pdf", "book.pdf"],
            type: "file",
            dateModified: "May 20 2017 01:50:00 PM",
            size: 2.1
        },
        {
            id: 6,
            filePath: ["Documents", "pdf", "cv.pdf"],
            type: "file",
            dateModified: "May 20 2016 11:50:00 PM",
            size: 2.4
        },
        { id: 7, filePath: ["Documents", "xls"], type: "folder" },
        {
            id: 8,
            filePath: ["Documents", "xls", "accounts.xls"],
            type: "file",
            dateModified: "Aug 12 2016 10:50:00 AM",
            size: 4.3
        },
        { id: 9, filePath: ["Documents", "stuff"], type: "folder" },
        {
            id: 10,
            filePath: ["Documents", "stuff", "xyz.txt"],
            type: "file",
            dateModified: "Jan 17 2016 08:03:00 PM",
            size: 1.1
        },
        { id: 11, filePath: ["Music"], type: "folder" },
        { id: 12, filePath: ["Music", "mp3"], type: "folder" },
        {
            id: 13,
            filePath: ["Music", "mp3", "theme.mp3"],
            type: "file",
            dateModified: "Sep 11 2016 08:03:00 PM",
            size: 14.3
        },
        { id: 14, filePath: ["Misc"], type: "folder" },
        {
            id: 15,
            filePath: ["Misc", "temp.txt"],
            type: "file",
            dateModified: "Aug 12 2016 10:50:00 PM",
            size: 101
        }
    ];

    class FileCellRenderer {
        init(params) {
            let divNode = document.createElement("div");
            let value = params.value;
            let icon = this.getFileIcon(params.value);

            let Extend = Vue.extend({
                props: ["icon", "node", "text"],
                data() {
                    return {
                        nodeInfo: null
                    };
                },
                created() {
                    this.nodeInfo = this.node;
                },
                render(h) {
                    const { icon, node, text, nodeInfo } = this;
                    let iconName = icon;
                    if (icon === "folder") {
                        iconName = nodeInfo.expanded
                            ? "folder-open"
                            : "folder-close";
                    }
                    return h(
                        "div",
                        {
                            style: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: node.rowHeight + "px"
                            }
                        },
                        [
                            h("bird-svg-icon", {
                                props: {
                                    name: iconName,
                                    width: 14,
                                    height: 14
                                },
                                class: {
                                    [iconName]: true,
                                    folder: icon === "folder"
                                }
                            }),
                            h(
                                "span",
                                {
                                    class: "filename"
                                },
                                text
                            )
                        ]
                    );
                }
            });

            if (icon) {
                let instance = new Extend({
                    propsData: {
                        icon,
                        node: params.node,
                        text: value
                    }
                });
                instance.$mount();
                divNode.appendChild(instance.$el);
            } else {
                divNode.innerHTML = value;
            }
            this.eGui = divNode.firstChild;
        }
        getGui() {
            return this.eGui;
        }
        getFileIcon(filename) {
            if (filename.endsWith(".mp3") || filename.endsWith(".wav")) {
                return "video";
            } else if (filename.endsWith(".xls")) {
                return "excel";
            } else if (filename.endsWith(".txt")) {
                return "txt";
            } else if (filename.endsWith(".pdf")) {
                return "pdf";
            } else {
                return "folder";
            }
        }
    }
    export default {
        data() {
            return {
                colDefs: [
                    {
                        field: "dateModified",
                        headerName: "修改日期"
                    },
                    {
                        field: "size",
                        headerName: "大小",
                        valueFormatter: params =>
                            params.value ? params.value + " MB" : ""
                    }
                ],
                gridApi: null,
                defaultColDef: {
                    flex: 1
                },
                rowData: null,
                getDataPath: data => data.filePath,
                getRowId: params => params.data.id,
                autoGroupColumnDef: {
                    rowDrag: true,
                    headerName: "文件",
                    minWidth: 300,
                    cellRendererParams: {
                        suppressCount: true,
                        innerRenderer: FileCellRenderer
                    }
                }
            };
        },
        created() {
            this.rowData = data;
        },
        methods: {
            onGridReady(params) {
                this.gridApi = params.api;
            },
            onRowDragEnd(event) {
                let overNode = event.overNode;
                if (!overNode) return;
                let folderToDropInto =
                    overNode.data.type === "folder"
                        ? overNode
                        : overNode.parent;
                let movingData = event.node.data;
                let newParentPath = folderToDropInto.data
                    ? folderToDropInto.data.filePath
                    : [];
                let needToChangeParent = !arePathsEqual(
                    newParentPath,
                    movingData.filePath
                );
                let invalidMode = isSelectionParentOfTarget(
                    event.node,
                    folderToDropInto
                );
                if (invalidMode) {
                    console.log("invalid move");
                }
                if (needToChangeParent && !invalidMode) {
                    let updatedRows = [];
                    moveToPath(newParentPath, event.node, updatedRows);
                    this.gridApi.applyTransaction({
                        update: updatedRows
                    });
                    this.gridApi.clearFocusedCell();
                }
            }
        }
    };
</script>

<style lang="less">
    .tree-drag-table {
        .folder {
            color: darkorange;
        }
        .pdf {
            color: red;
        }
        .excel {
            color: green;
        }
        .video {
            color: blue;
        }
        .filename {
            padding: 5px;
            font-size: 16px;
            font-family: "Courier New", Courier, monospace;
            color: var(--ag-foreground-color);
        }
        .hover-over {
            background-color: #e5e5ff;
        }
    }
</style>
