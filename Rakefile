require 'pry'
require 'yaml'
require 'nokogiri'
require 'open-uri'

namespace :rubric do
  desc 'Scrape Ruby core class data and write to file'
  task :scrape do

    # Grab Ruby core class names from ruby-doc
    source = 'http://ruby-doc.org/core-2.1.3'
    target = 'data/classify.yml'
    html = Nokogiri::HTML(open(source))
    ruby_classes = html.css('.class a').map(&:text)
    blacklist = %w(Complex::compatible Continuation fatal unknown
                      Rational::compatible ENV ARGF)
    ruby_classes -= blacklist
    ruby_classes.map! { |c| Object.const_get(c) }
    parents, children, ancestry = {}, {}, {}
    direct_ancestry, collateral_ancestry = {}, {}

    # Prep the data
    ruby_classes.each do |klass|
      parents[klass]   = klass.superclass
      ancestry[klass]  = klass.ancestors
      children[klass]  = ruby_classes.select { |c| c.superclass == klass }
      direct_ancestry[klass], collateral_ancestry[klass] =
        ancestry[klass].partition { |m| m.is_a? Class }
    end

    # Build yml file with class relationship data
    File.open(target, 'w') do |file|
      file.puts  'klasses:'
      ruby_classes.each do |klass|
        file.puts   "  - name: #{klass}"
        file.puts   "    parent: #{parents[klass]}"
        file.puts   "    children:"
        children[klass].each do |child|
          file.puts "      - #{child}"
        end
        file.puts   "    ancestry:"
        ancestry[klass].each do |ancestor|
          file.puts "      - #{ancestor}"
        end
        file.puts   "    direct_ancestry:"
        direct_ancestry[klass].each do |grand_class|
          file.puts "      - #{grand_class}"
        end
        file.puts   "    collateral_ancestry:"
        collateral_ancestry[klass].each do |grand_module|
          file.puts "      - #{grand_module}"
        end
      end
    end
  end
end