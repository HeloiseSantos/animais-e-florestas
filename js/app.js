$(document).ready(function() {
    $('[data-group]').each(function() {
        var $allTarget = $(this).find('[data-target]'),
            $allClick = $(this).find('[data-click]'),
            activeClass = 'active';

        $allTarget.first().addClass(activeClass);
        $allClick.first().addClass(activeClass);

        $allClick.click(function(e) {
            e.preventDefault();

            var idData = $(this).data('click'),
                $target = $('[data-target="' + idData + '"]');

            $allClick.removeClass(activeClass);
            $allTarget.removeClass(activeClass);

            $target.addClass(activeClass);
            $(this).addClass(activeClass);

        });
    });
});