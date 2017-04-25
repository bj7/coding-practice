const minQueue = (item, priority) => {
    let queue = [];
    if (item !== undefined && priority !== undefined)
        queue.push({
            i: item,
            p: priority,
        });

    /**
     * Merge routine for mergesort.
     * @param {number|Array} l1 - the left side of the array to merge.
     * @param {number|Array} l2 - the right side of the array to merge
     * @return {Array} Returns sorted array.
     */
    const merge = (l1, l2) => {
        let c = [];
        while (l1.length > 0 && l2.length > 0) {
            if (l1[0].p > l2[0].p) {
                c.push(l2[0]);
                l2.splice(0, 1);
            } else {
                c.push(l1[0]);
                l1.splice(0, 1);
            }
        }

        while (l1.length > 0) {
            c.push(l1[0]);
            l1.splice(0, 1);
        }

        while (l2.length > 0) {
            c.push(l2[0]);
            l2.splice(0, 1);
        }

        return c;
    };

    /**
     * Split routine of mergesort.
     * @param {Array} q - Array to sort.
     * @return {Array} Returns sorted array.
     */
    const mergeSort = q => {
        if (q.length <= 1) return q;

        let l1 = q.splice(0, (q.length / 2));
        let l2 = q;

        l1 = mergeSort(l1);
        l2 = mergeSort(l2);

        return merge(l1, l2);
    };

    /**
     * Adds the item with the specified priority.
     * @param {any} i - Identifier of the item in the queue
     * @param {number} p - Priority of item.
     */
    const add_with_priority = (i, p) => {
        queue.push({
            i: i,
            p: p,
        });
        queue = mergeSort(queue);
    };

    /**
     * Decreases the priority of the specified item
     * @param {any} i - Identifier
     * @param {number} p - Priority value
     */
    const decrease_priority = (i, p) => {
        let index = queue.length - 1;
        while (index > 0) {
            if (queue[index].i == i) {
                queue[index].p = p;
                index = 0;
            }
            index--;
        }
        queue = mergeSort(queue);
    };

    return ({
        push: (i, p) => {
            add_with_priority(i, p);
        },
        decrease_priority: (i, p) => {
            decrease_priority(i, p);
        },
        print: () => {
            console.log(queue);
        },
        pop: () => {
            return queue.splice(0, 1);
        },
    });
};

let q = minQueue('e', 2);
q.push('a', 9);
q.push('b', 10);
q.push('c', 5);
q.push('d', 3);
q.print();
q.decrease_priority('a', 1);
q.print();
