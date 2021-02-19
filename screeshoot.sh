# COUNT= $#

# if [ COUNT -ge 0 ]
# then
#    statement1
# else
#    statement2
# fi
a=0
for TOKEN in $*
do
   echo $TOKEN
   node /d/JAVASCRIPT/automate/automatejs/screeshoot.js $TOKEN $a 
   a=`expr $a + 1`
done
# while [ $a -lt 10 ]
# do
#    a=`expr $a + 1`
#    echo $a
# done
