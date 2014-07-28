module.exports = function(grunt){

	var transport = require('grunt-antrol-transport');
	
    var style = transport.style.init(grunt);
    var text = transport.text.init(grunt);
    var script = transport.script.init(grunt);
	

    grunt.initConfig({
    	
    	// Project settings
        yeoman: {
            // configurable paths
            app: './app',
            dist: './dist'
        },
    	
    	transport :  {
    		options : {
    			paths : ["<%= yeoman.app %>/scripts"],
    			parsers : {
                    '.js' : [script.jsParser],
                    '.css' : [style.css2jsParser],
                    '.tpl' : [text.html2jsParser]
                },
                debug : false
    		},
    		dest : {
	            files: [{
	                cwd: '<%= yeoman.app %>/scripts',
	                src: '**/*',
	                filter : "isFile",
	                expand : true,
	                dest: '.tmp'
	            }]
	        }
    	},
    	cmdconcat : {
    		dest : {
    			options : {
    				paths : [".tmp"],
    				include : "all",
    				imageRoot : ["<%= yeoman.dist %>"]
    			},
    			files : [{
    				cwd : '.tmp',
    				src : 'page/*.js',
    				expand : true,
    				dest : '<%= yeoman.dist %>/scripts'
    			}
    			]
    		}
    	},
    	useminPrepare: {
            html: '<%= yeoman.app %>/main.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
		           html: {
		             steps: {
		               js: ['concat', 'uglifyjs'],
		               css: ['cssmin']
		             },
		             post: {}
		           }
		        }
            }
        },
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/*.html'],
            css: ['<%= yeoman.dist %>/css/**/*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>' , '<%= yeoman.dist %>/images']
            }
        },
        cssmin: {
	       options: {
	         root: '<%= yeoman.app %>'
	       }
	    },
    	copy : {
    		dest : {
    			files : [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.html',
                            'css/**/*.{png,jpg,jpeg,gif}',
                            'images/**/*.{png,jpg,jpeg,gif}'
                        ]
                    },
	    			{
	    				cwd : '<%= yeoman.app %>',
	    				src : [
	                        'scripts/vendors/sea.js',
	                        'scripts/vendors/jquery.js'
	    				],
	    				expand : true,
	    				dot: true,
	    				dest : '<%= yeoman.dist %>'
	    			}
	    		]
    		}
    	},
    	rev: {
            dest: {
                files: [{
                	cwd : '<%= yeoman.dist %>',
    				src : [
    					'css/{main,vendor}.css',
                        'css/**/*.{png,jpg,jpeg,gif}',
                    	'images/**/*.{png,jpg,jpeg,gif}'
    				],
    				expand : true,
    				dot: true,
    				dest : '<%= yeoman.dist %>'
                }]
            }
        },
        uglify : {
	   	   options : {
		   	   mangle : {
		   	   	 except : ['require','exports','module']
		   	   }
		   },
	       dest: {
	         files: [{
	         	expand : true,
	         	cwd : '<%= yeoman.dist %>/scripts/',
	         	src : ["page/*.js"],
	         	dest : '<%= yeoman.dist %>/scripts'
	         }]
	       }
        },
        imagemin : {
        	dest : {
        		files : [{
					expand : true,
					cwd : '<%= yeoman.dist %>',
					src : ['**/*.{png,jpg,gif}'],
					dest : '<%= yeoman.dist %>'
        		}]
        	}
        },
        htmlmin : {
        	options: { 
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeCommentsFromCDATA: true,
                removeOptionalTags: true,
                minifyJS : true
	      	},
			dest : {
        		files : [{
					expand : true,
					cwd : '<%= yeoman.dist %>',
					src : ['**/*.html'],
					dest : '<%= yeoman.dist %>'
        		}]
        	}        	
        },
    	clean : {
    		pre : {
    			files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>'
                        ]
                    }
                ]
    		},
    		post : {
    			files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                        ]
                    }
                ]
    		}
    	}
    });

    grunt.loadNpmTasks('grunt-antrol-transport');
    grunt.loadNpmTasks('grunt-antrol-concat');
    grunt.loadNpmTasks('grunt-antrol-cssmin');
    
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
		    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.registerTask('build', [
    	'clean:pre'
    	,'useminPrepare'
	    ,'copy'
	    ,'cssmin'
	    ,'rev'
    	,'usemin'
    	,'imagemin'
    	,'htmlmin'
    	,'transport'
    	
    	,'cmdconcat'
    	,'uglify'
    	, 'clean:post'
    ]);
    
}
