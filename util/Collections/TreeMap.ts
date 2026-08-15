interface Comparable<T>
{
    compareTo(other: T): number;
}

class TreeNode<K extends Comparable<K>, V>
{
    key: K;
    value?: V;
    left?: TreeNode<K, V>;
    right?: TreeNode<K, V>;

    constructor(key: K, value?: V, left?: TreeNode<K, V>, right?: TreeNode<K, V>)
    {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
    }

    assign(key : K, value: V): TreeNode<K, V>
    {
        const comp = key.compareTo(this.key);

        if (comp < 0)
        {
            if(!this.left)
            {
                this.left = new TreeNode<K, V>(key);
                return this.left;
            }
            else 
                return this.left.assign(key, value);
        }
        else if(comp > 0)
        {
            if(!this.right)
            {
                this.right = new TreeNode<K, V>(key);
                return this.right;
            } 
            else 
                return this.right.assign(key, value);
        }
        else
        {
            return this;
        }
    }
}

class _TreeMap<K extends Comparable<K>, V>
{
    root?: TreeNode<K,V>;
    size: number = 0;

    // constructor()
    // {
    
    // }

    put(key: K, value: V): V | undefined
    {
        if(this.root === undefined)
        {
            this.root = new TreeNode<K, V>(key, value);
            this.size = 1;
            return undefined;
        }

        const node = this.root?.assign(key, value);

        const prevValue = node?.value;

        if(!node?.value) this.size++;
        
        node.value = value;

        return prevValue;
    }
    
    get(key: K): V | undefined
    {
        let curr: TreeNode<K,V> | undefined = this.root;

        while(curr !== undefined)
        {
            const comp = key.compareTo(curr.key);
            
            if(comp < 0)
            {
                curr = curr.left;
            }
            else if(comp > 0)
            {
                curr = curr.right;
            }
            else
            {
                return curr.value;
            }
        }

        return undefined;
    }

}