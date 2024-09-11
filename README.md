# Example for state in different components

In this next app we have a single page with two components that both 
need to read the same bit of state.

As per Next's docs, it is fine to kick of two independent requests
for that state since the data cache will deduplicate them.

AFAICT, there is currently no other way to "share" this bit of state between the
components.

The `Incement` component renders a button that alters the state with a server action 
and it uses `useOptimistic` to render a snappier UI, since updating the state is slow.

Is there a way to also optimistically update the `Count` component without 
changing the structure of the app too much? 

Note that this is a simplified example. In the real world app you can imagine the
Count component to belong to the cart count of a user.

## Running the example

Run the example app using:

```sh
next
```

The server will start on at <http://localhost:3000>.
