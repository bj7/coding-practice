const minQueue = item => {
    let queue = [];
    queue.push(item);

    /**
     * Merge routine for mergesort.
     * @param {number|Array} l1 - the left side of the array to merge.
     * @param {number|Array} l2 - the right side of the array to merge
     * @return {Array} Returns sorted array.
     */
    const merge = (l1, l2) => {
        let c = [];
        while (l1.length > 0 && l2.length > 0) {
            if (l1[0] > l2[0]) {
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
     * Pushes the new item into the min queue.
     * @param {number} i - item to sort
     */
    const minPush = i => {
        queue.push(i);
        queue = mergeSort(queue);
    };

    return ({
        push: i => {
            minPush(i);
        },
        print: () => {
            console.log(queue);
        },
        pop: () => {
            return queue.splice(0, 1);
        },
    });
};

let q = minQueue(2);
q.push(9);
q.push(10);
q.push(5);
q.push(3);
q.print();
