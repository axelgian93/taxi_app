//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:openapi/src/model/admin_tariffs_list200_response_items_inner.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_tariffs_list200_response.g.dart';

/// AdminTariffsList200Response
///
/// Properties:
/// * [items] 
@BuiltValue()
abstract class AdminTariffsList200Response implements Built<AdminTariffsList200Response, AdminTariffsList200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<AdminTariffsList200ResponseItemsInner>? get items;

  AdminTariffsList200Response._();

  factory AdminTariffsList200Response([void updates(AdminTariffsList200ResponseBuilder b)]) = _$AdminTariffsList200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminTariffsList200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminTariffsList200Response> get serializer => _$AdminTariffsList200ResponseSerializer();
}

class _$AdminTariffsList200ResponseSerializer implements PrimitiveSerializer<AdminTariffsList200Response> {
  @override
  final Iterable<Type> types = const [AdminTariffsList200Response, _$AdminTariffsList200Response];

  @override
  final String wireName = r'AdminTariffsList200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminTariffsList200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(AdminTariffsList200ResponseItemsInner)]),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    AdminTariffsList200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminTariffsList200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AdminTariffsList200ResponseItemsInner)]),
          ) as BuiltList<AdminTariffsList200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AdminTariffsList200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminTariffsList200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

