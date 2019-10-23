
# Table of Contents

1.  [typelevel-typescript](#org324464e)
    1.  [Jump-start](#org41b79ba)



<a id="org324464e"></a>

# typelevel-typescript


<a id="org41b79ba"></a>

## Jump-start

I'm gonna load bash execution language to `emacs` `org mode` by executing this code
block with `C-c C-c` read as `Control-C Control-C`:

    (org-babel-do-load-languages
     'org-babel-load-languages
     '((shell . t)
       (typescript . t)))

Let's start with the usual boilerplate

    # mkdir typelevel-typescript
    # cd typelevel-typescript
    npm init -y

Locally install typescript

    npm install --save typescript

    + typescript@3.6.4
    added 1 package from 1 contributor and audited 1 package in 1.121s
    found 0 vulnerabilities

There's no way of executing (right now) typescript code blocks inside
org-mode, so lets do a quick hack, to run a file from shell instead.
Note the `|| true` to accept errors, that's what we want after all,
our code to fail, and our compiler to tell us when.

    ./node_modules/.bin/tsc --noEmit --strict ./test.ts || true 2>1

    test.ts(1,7): error TS2322: Type '"10"' is not assignable to type 'number'.

Nice, but that probably sucks, i'd rather call typescript in org-mode, at
least for now, so here's a quick eval method to run it in here: 

(PROTIP: `C-c C-c`)

    (defun org-babel-execute:typescript (body params)
      (let* ((fin (org-babel-temp-file "tsc-" ".ts"))
             (args (cdr (assoc :args params)))
             (cmd (format "./node_modules/.bin/tsc %s %s || true" args fin)))
        (with-temp-file fin (insert body))
        ;; Theres some annoying file url (the input) being prepended to the output,
        ;; so eval tsc first, replace it (remove it) and then return it's result
        (let ((result (org-babel-eval cmd ""))
              (regexp (format "^.+%s" fin)))
          (replace-regexp-in-string regexp "" result))))

Testing

    const x: number = false;
    console.log(x);

    (1,7): error TS2322: Type 'false' is not assignable to type 'number'.

GREAT!

*(background checks one more time while no one is looking)*

    const x: number = false;
    const x: number = false;

    (1,7): error TS2322: Type 'false' is not assignable to type 'number'.
    (1,7): error TS2451: Cannot redeclare block-scoped variable 'x'.
    (2,7): error TS2322: Type 'false' is not assignable to type 'number'.
    (2,7): error TS2451: Cannot redeclare block-scoped variable 'x'.

Now to some serious [1] stuff.

[1] Citation needed

